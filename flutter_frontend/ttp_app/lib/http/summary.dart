import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:ttp_app/const/var.dart';

class Summary {
  final String summary;

  const Summary({required this.summary});

  factory Summary.fromJson(Map<String, dynamic> json) {
    return switch (json) {
      {
        'profile_summary': String summary,
      } =>
        Summary(
          summary: summary,
        ),
      _ => throw const FormatException('Failed to load album.'),
    };
  }
}

Future<Summary> fetchProfileSummary({required String uid}) async {
  final response =
      await http.get(Uri.parse("$gptEndpoint/scenario/summary/$uid"));

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    var jsonResponse = json.decode(response.body);
    var data = jsonResponse['content'];
    return Summary.fromJson(data as Map<String, dynamic>);
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Failed to load album');
  }
}
