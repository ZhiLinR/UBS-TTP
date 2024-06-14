import 'package:http/http.dart' as http;
import 'dart:convert';
import '../const/var.dart';

class Post {
  final String createdByUID;
  final String postID;
  final String timestamp;

  const Post(
      {required this.createdByUID,
      required this.postID,
      required this.timestamp});

  factory Post.fromJson(Map<String, dynamic> json) {
/*     return switch (json) {
      {
        'content.post_id': String postID,
        'content.created_by_uid': String createdByUID,
        'content.timestamp': String timestamp,
      } =>
        Post(postID: postID, createdByUID: createdByUID, timestamp: timestamp),
      _ => throw const FormatException('Failed to load album.'),
    }; */

    // ignore: avoid_print
    print(json['content']);
    return Post(
        postID: json['content']['post_id'] as String,
        createdByUID: json['content']['post_id'] as String,
        timestamp: json['content']['post_id'] as String);
  }
}

Future<List> fetchAlbum() async {
  final response =
      await http.get(Uri.parse("http://192.168.1.1:3200/api/posts"));
  try {
    if (response.statusCode == 200) {
      // If the server did return a 200 OK response,
      // then parse the JSON.
      var data = json.decode(response.body);
      Future<List> posts = data.map((element) {
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
