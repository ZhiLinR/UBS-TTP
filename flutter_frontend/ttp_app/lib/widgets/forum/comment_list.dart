import 'package:flutter/material.dart';
import 'package:ttp_app/http/comment.dart';

// Define a custom Form widget.
class CommentList extends StatefulWidget {
  final String postID;
  const CommentList({required this.postID, super.key});

  @override
  _CommentListState createState() {
    return _CommentListState();
  }
}

class _CommentListState extends State<CommentList> {
  late Future<List<dynamic>> futureCommentList;
  @override
  void initState() {
    super.initState();
    futureCommentList = fetchPostComments(widget.postID);
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<dynamic>>(
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
                  titleTextStyle: TextStyle(fontFamily: 'Roboto', fontSize: 10),
                  enableFeedback: true,
                  title: Text(temp.uid),
                  subtitle: Text(
                    temp.textContent,
                  ));
            },
          );
        }
        // By default, show a loading spinner.
        return const CircularProgressIndicator();
      },
    );
  }
}
