import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:ttp_app/const/var.dart';

class Summary {
  final String uid;
  final String profileSummary;

  const Summary({required this.uid, required this.profileSummary});
  factory Summary.fromJson(Map<String, dynamic> json) {
    return switch (json) {
      {
        'profile_summary': String timestamp,
      } =>
        Summary(profileSummary: timestamp, uid: uid),
      _ => throw const FormatException('Failed to load comments.'),
    };
  }
}

Future<List<dynamic>> fetchPostComments(postID) async {
  final response = await http.get(Uri.parse("$forumEndpoint/posts/$postID"));
  try {
    if (response.statusCode == 200) {
      var jsonResponse = json.decode(response.body);
      var data = jsonResponse['content']['comments'];

      List<dynamic> posts = data.map((element) {
        return Summary.fromJson(element);
      }).toList();
      return posts;
    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.
      throw Exception('Failed to load Comments');
    }
  } catch (e) {
    // ignore: avoid_print
    print(e.toString());
    throw Exception(e.toString());
  }
}
