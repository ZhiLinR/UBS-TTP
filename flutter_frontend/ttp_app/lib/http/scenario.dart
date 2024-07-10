import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:ttp_app/const/var.dart';
import 'package:ttp_app/settings/settings.dart';

class Scenario {
  final Options options;
  final String scenario;
  const Scenario({
    required this.scenario,
    required this.options,
  });
}

class Options {
  final String passive;
  final String reactive;
  final String proactive;
  final String active;
  const Options(
      {required this.passive,
      required this.reactive,
      required this.proactive,
      required this.active});

  factory Options.fromJson(Map<String, dynamic> json) {
    return switch (json) {
      {
        'passive': String passive,
        'reactive': String reactive,
        'proactive': String proactive,
        'active': String active,
      } =>
        Options(
            passive: passive,
            reactive: reactive,
            proactive: proactive,
            active: active),
      _ => throw const FormatException('Failed to load options.'),
    };
  }
}

Future<Scenario> generateScenario(uid, String? topic) async {
  final response = await http.post(Uri.parse("$gptEndpoint/scenario/"), body: {
    "uid": uid,
  });
  try {
    if (response.statusCode == 200) {
      var jsonResponse = json.decode(response.body);
      var scenarioData = jsonResponse['content']['scenario'];
      var optionData = jsonResponse['content']['options'];
      Options finalOptions =
          Options.fromJson(optionData as Map<String, dynamic>);
      // ignore: avoid_print
      print(jsonResponse.toString());
      return Scenario(scenario: scenarioData, options: finalOptions);
    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.
      throw Exception('Failed to retrieve scenario.');
    }
  } catch (e) {
    // ignore: avoid_print
    print(e.toString());
    throw Exception(e.toString());
  }
}
