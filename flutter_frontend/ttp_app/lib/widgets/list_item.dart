import 'package:flutter/material.dart';
import '../fetch/posts.dart';

class PostWidget extends StatelessWidget {
  final Post postData;
  final String picture;
  const PostWidget(
      {super.key,
      this.picture =
          "https://www.meme-arsenal.com/memes/6555df5f021aaa0839af4f29f0a18ed1.jpg",
      required this.postData});

  @override
  Widget build(BuildContext context) {
    return Card(
      clipBehavior: Clip.hardEdge,
      child: SizedBox(
        height: 300,
        width: 300,
        child: Column(children: [
          Expanded(
            flex: 2,
            child: Image.network(
              picture,
              fit: BoxFit.cover,
            ),
          ),
          ListTile(
            title: Text(postData.title),
            subtitle: Text(
              postData.description,
              overflow: TextOverflow.ellipsis,
            ),
          )
        ]),
      ),
    );
  }
}
