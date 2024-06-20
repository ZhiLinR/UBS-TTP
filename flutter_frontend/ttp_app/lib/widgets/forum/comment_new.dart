import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:ttp_app/const/var.dart';
import 'package:ttp_app/settings/settings.dart';
import 'package:ttp_app/fetch/posts.dart';

// Define a custom Form widget.
class CommentForm extends StatefulWidget {
  final Post postData;
  const CommentForm({required this.postData, super.key});

  @override
  _CommentFormState createState() {
    return _CommentFormState();
  }
}

class _CommentFormState extends State<CommentForm> {
  final _formKey = GlobalKey<FormState>();
  final commentController = TextEditingController();
/*   final Post postData;
  _CommentFormState({required this.postData}); */
  @override
  void dispose() {
    // Clean up the controller when the widget is disposed.
    commentController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        margin: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            TextFormField(
              controller: commentController,
              key: const Key("comment"),
              decoration: const InputDecoration(
                border: UnderlineInputBorder(),
                labelText: 'Type your comment here!',
              ),
            ),
            ElevatedButton(
              child: const Text('Post'),
              onPressed: () async {
                var response = await postComment(
                    widget.postData.postID, commentController.text);
                // ignore: avoid_print
                print(response);
              },
            ),
          ],
        ));
  }
}

Future<dynamic> postComment(postID, comment) async {
  try {
    final response = await http.post(
        Uri.parse("$forumEndpoint/posts/$postID/comments/"),
        body: {'uid': uid, 'comment': comment});
// ignore: avoid_print
    print(json.decode(response.body));
    return response;
  } catch (e) {
    e.toString();
    throw Exception(e.toString());
  }
}

Future<List> fetchPostComments(postID) async {
  final response = await http.get(Uri.parse("$forumEndpoint/posts/$postID"));
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
