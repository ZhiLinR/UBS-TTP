import 'package:flutter/material.dart';
import 'package:ttp_app/http/comment.dart';
import 'package:ttp_app/http/posts.dart';
import 'package:ttp_app/widgets/alertdialog.dart';

// Define a custom Form widget.
class Comments extends StatefulWidget {
  final Post postData;
  const Comments({required this.postData, super.key});

  @override
  _CommentsState createState() {
    return _CommentsState();
  }
}

class _CommentsState extends State<Comments> {
  final _formKey = GlobalKey<FormState>();
  final commentController = TextEditingController();
  @override
  void dispose() {
    // Clean up the controller when the widget is disposed.
    commentController.dispose();
    super.dispose();
  }

  late Future<List<dynamic>> futureCommentList;
  @override
  void initState() {
    super.initState();
    futureCommentList = fetchPostComments(widget.postData.postID);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        margin: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            FutureBuilder<List<dynamic>>(
              future: futureCommentList,
              builder: (context, snapshot) {
                if (snapshot.hasData &&
                    snapshot.connectionState == ConnectionState.done) {
                  return ListView.builder(
                    scrollDirection: Axis.vertical,
                    shrinkWrap: true,
                    itemCount: snapshot.data!.length,
                    itemBuilder: (context, index) {
                      Comment temp = snapshot.data?[index] as Comment;
                      return ListTile(
                          titleTextStyle:
                              TextStyle(fontFamily: 'Roboto', fontSize: 10),
                          enableFeedback: true,
                          title: Text(temp.uid,
                              style: TextStyle(
                                  fontFamily: 'Roboto',
                                  fontSize: 10,
                                  color: Colors.black)),
                          subtitle: Text(
                            temp.textContent,
                          ));
                    },
                  );
                }
                // By default, show a loading spinner.
                return const CircularProgressIndicator();
              },
            ),
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
                setState(() {
                  FocusManager.instance.primaryFocus?.unfocus();
                  openDialog(context, "Successfully Posted!",
                      "Your Comment has been Posted!");
                  commentController.text = "";
                  futureCommentList = fetchPostComments(widget.postData.postID);
                });
              },
            ),
          ],
        ));
  }
}
