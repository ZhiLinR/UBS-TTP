import 'package:flutter/material.dart';
import 'package:ttp_app/http/posts.dart';

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
                var response = await postComment(widget.postData.createdByUID,
                    widget.postData.postID, commentController.text);
                // ignore: avoid_print
                print(response);
                setState(() {});
              },
            ),
          ],
        ));
  }
}
