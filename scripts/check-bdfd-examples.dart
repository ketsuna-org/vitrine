// Runs the REAL BDFD engine (BdfdEngine.validation().prepare) on every ```bdfd example of _docs and lists blocks with
// unknown functions, refused argument counts or unbalanced structures. Copy to bot-creator packages/shared/tool/ and run:
//   dart run tool/check_vitrine_examples.dart <path to vitrine> [page.md ...]   (prints [] when everything is valid)
import 'dart:convert';
import 'dart:io';
import 'package:bot_creator_shared/engine/bdfd/engine.dart';
import 'package:bot_creator_shared/engine/bdfd/program.dart';

/// Usage: dart run tool/check_vitrine_examples.dart <vitrine dir> [file.md ...]
void main(List<String> args) {
  final root = args.first;
  final engine = BdfdEngine.validation();
  final known = {...engine.supportedFunctions, ...BdfdProgram.structuralFunctionNames};
  final fence = RegExp(r'^```bdfd[^\n]*\n([\s\S]*?)^```\s*$', multiLine: true);
  final files = args.length > 1
      ? args.skip(1).map((f) => File('$root/_docs/$f')).toList()
      : (Directory('$root/_docs').listSync().whereType<File>().where((f) => f.path.endsWith('.md')).toList()..sort((a, b) => a.path.compareTo(b.path)));
  final out = <Map<String, dynamic>>[];
  for (final f in files) {
    var i = 0;
    for (final m in fence.allMatches(f.readAsStringSync())) {
      i++;
      final src = m.group(1)!;
      final problems = <String>[];
      for (final n in RegExp(r'(?<!\\)\$([A-Za-z_]\w*)').allMatches(src)) {
        if (!known.contains(n.group(1)!.toLowerCase())) problems.add('unknown \$${n.group(1)}');
      }
      try { engine.prepare(src); } catch (e) { problems.add('prepare: ${e.toString().split('\n').first}'); }
      if (problems.isNotEmpty) out.add({'file': f.uri.pathSegments.last, 'block': i, 'problems': problems.toSet().toList()});
    }
  }
  stdout.writeln(const JsonEncoder.withIndent(' ').convert(out));
}
