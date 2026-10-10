// Regenerates _data/bdfd-engine-signatures.json from the real BDFD engine registry.
// The engine (bot-creator, packages/shared) is the source of truth: the documentation
// describes it. tests/docs_engine_signatures.test.mjs compares every _docs page to this file.
//
// From a bot-creator checkout, copy this file to packages/shared/tool/, then:
//   cd packages/shared && dart run tool/dump-bdfd-signatures.dart <path to vitrine>/_data/bdfd-engine-signatures.json
import 'dart:convert';
import 'dart:io';

import 'package:bot_creator_shared/engine/bdfd/engine.dart';

void main(List<String> args) {
  final target = args.isEmpty ? 'bdfd-engine-signatures.json' : args.first;
  final all = BdfdEngine.validation().functionSignatures;
  final out = <String, dynamic>{};
  for (final name in all.keys.toList()..sort()) {
    final s = all[name]!;
    out[name] = {
      'min': s.minArguments,
      'max': s.maxArguments > 1000 ? null : s.maxArguments,
      if (s.allowedArgumentCounts != null)
        'counts': (s.allowedArgumentCounts!.toList()..sort()),
    };
  }
  File(target).writeAsStringSync(const JsonEncoder.withIndent(' ').convert(out));
  stdout.writeln('Wrote ${out.length} signatures to $target');
}
