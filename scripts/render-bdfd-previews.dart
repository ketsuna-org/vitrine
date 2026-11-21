// Pre-renders every ```bdfd example of the documentation with the REAL engine (the same command sandbox the
// runner uses for POST /v1/preview), so a doc page shows what Discord would receive without any server call.
// Copy to bot-creator packages/shared/tool/ and run:
//   dart run tool/render_vitrine_previews.dart <path to vitrine> [page.md ...]
// Writes <vitrine>/assets/previews/<locale>-<page>.json. The key of a block is previewKey(script): the same
// function is in assets/js/bdfd-preview.js (FNV-1a 32 over UTF-16 code units, plus the length).
import 'dart:convert';
import 'dart:io';
import 'package:bot_creator_shared/sandbox/command_sandbox.dart';

String previewKey(String script) {
  var h = 0x811c9dc5;
  for (final unit in script.codeUnits) {
    h ^= unit;
    h = (h * 0x01000193) & 0xffffffff;
  }
  return '${h.toRadixString(16).padLeft(8, '0')}-${script.length}';
}

Future<void> main(List<String> args) async {
  final root = args.first;
  final only = args.skip(1).toSet();
  final fence = RegExp(r'^```bdfd[^\n]*\n([\s\S]*?)^```\s*$', multiLine: true);
  final out = Directory('$root/assets/previews')..createSync(recursive: true);
  var total = 0, ok = 0, failed = 0;
  final problems = <String>[];
  for (final locale in ['en', 'fr']) {
    final dir = Directory(locale == 'en' ? '$root/_docs' : '$root/fr/docs');
    if (!dir.existsSync()) continue;
    final files = dir.listSync().whereType<File>().where((f) => f.path.endsWith('.md')).toList()
      ..sort((a, b) => a.path.compareTo(b.path));
    for (final f in files) {
      final name = f.uri.pathSegments.last.replaceAll('.md', '');
      if (only.isNotEmpty && !only.contains('$name.md')) continue;
      final blocks = <String, dynamic>{};
      for (final m in fence.allMatches(f.readAsStringSync())) {
        final script = m.group(1)!.trim();
        if (script.isEmpty) continue;
        total++;
        final r = await testCommandInSandbox({
          'script': script,
          'optionTypes': <String, dynamic>{},
          'defaultEntities': true,
          'variables': {'interaction.isSlash': 'true', 'command.id': 'sandbox-command'},
        });
        final messages = [
          for (final x in (r['responses'] as List? ?? const []))
            {'payload': (x as Map)['payload']},
        ];
        final good = r['success'] == true && (r['diagnostics'] as List? ?? const []).isEmpty;
        good ? ok++ : failed++;
        if (!good) problems.add('$locale/$name: ${r['error'] ?? r['diagnostics']}');
        blocks[previewKey(script)] = {
          'ok': good,
          'error': r['error'],
          'diagnostics': r['diagnostics'] ?? const [],
          'messages': messages,
        };
      }
      final target = File('${out.path}/$locale-$name.json');
      if (blocks.isEmpty) {
        if (target.existsSync()) target.deleteSync();
        continue;
      }
      target.writeAsStringSync(const JsonEncoder().convert({'v': 1, 'blocks': blocks}));
    }
  }
  stdout.writeln('blocks: $total, ok: $ok, failed: $failed');
  for (final p in problems.take(60)) {
    stdout.writeln('  $p');
  }
}
