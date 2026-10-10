// Runs BDFD scripts through the REAL native engine (BdfdEngine) and prints {src, out | error} for each.
// tests/bdfd_engine_behavior.test.mjs uses it to prove what the documentation claims about control flow,
// variables and embeds. No Discord service is available: only pure functions, loops, conditions, variables,
// JSON and embed staging can run.
//
// From a bot-creator checkout, copy this file to packages/shared/tool/, then:
//   cd packages/shared && dart run tool/probe-bdfd.dart <cases.json>      (cases.json = JSON array of script strings)
import 'dart:convert';
import 'dart:io';

import 'package:bot_creator_shared/engine/bdfd/engine.dart';
import 'package:bot_creator_shared/engine/bdfd/runtime.dart';
import 'package:bot_creator_shared/engine/execution_budget.dart';
import 'package:bot_creator_shared/services/bot_message_service.dart';

import '../test/helpers/variables_test_helpers.dart';

class _Messages implements BotMessageService {
  @override
  Future<BotMessageResult> send(
    BotMessageRequest request, {
    required CommandExecutionBudget budget,
    required Map<String, String> variables,
  }) async {
    budget.check();
    return BotMessageResult(messageId: '1', acknowledged: true);
  }
}

Future<void> main(List<String> args) async {
  final cases = (jsonDecode(File(args.first).readAsStringSync()) as List).cast<String>();
  final results = <Map<String, dynamic>>[];
  for (final src in cases) {
    final engine = BdfdEngine(store: MemoryBotDataStore(), botId: 'bot', messages: _Messages());
    final result = <String, dynamic>{'src': src};
    try {
      result['out'] = await engine
          .executeProgram(engine.prepare(src), context: BdfdContext(variables: {'guild.id': '10', 'author.id': '20'}))
          .timeout(const Duration(seconds: 20));
    } catch (error) {
      result['error'] = error.toString().split('\n').first;
    }
    results.add(result);
  }
  stdout.writeln(const JsonEncoder.withIndent(' ').convert(results));
}
