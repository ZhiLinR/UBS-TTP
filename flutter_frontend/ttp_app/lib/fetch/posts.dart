import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:ttp_app/const/var.dart';

class PostContent {
  final String title;
  final String description;

  const PostContent({required this.title, required this.description});
}

class Post {
  final String createdByUID;
  final String postID;
  final String timestamp;
  final String title;
  final String description;

  const Post(
      {required this.createdByUID,
      required this.postID,
      required this.timestamp,
      required this.title,
      required this.description});

  factory Post.fromJson(Map<String, dynamic> json) {
    return switch (json) {
      {
        'post_id': String postID,
        'created_by_uid': String createdByUID,
        'timestamp': String timestamp,
      } =>
        Post(
            postID: postID,
            createdByUID: createdByUID,
            timestamp: timestamp,
            title: json["post_content"]["title"],
            description: json["post_content"]["description"]),
      _ => throw const FormatException('Failed to load album.'),
    };
  }
}

Future<List> fetchAllPosts() async {
  final response = await http.get(Uri.parse("$forumEndpoint/posts"));
  try {
    if (response.statusCode == 200) {
      // If the server did return a 200 OK response,
      // then parse the JSON.
      var jsonResponse = json.decode(response.body);
      var data = jsonResponse['content'];
      List posts = data.map((element) {
        return Post.fromJson(element);
      }).toList();

      return posts;
    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.
      throw Exception('Failed to load album');
    }
  } catch (e) {
    e.toString();
    throw Exception(e.toString());
  }
}
