import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:ttp_app/fetch/posts.dart';
import 'package:ttp_app/const/colors.dart' as custom_color;
import 'package:ttp_app/widgets/forum/comment_new.dart';

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
      child: Container(
        child: Column(children: [
          /* Expanded(
            flex: 1,
            child: Image.network(
              picture,
              fit: BoxFit.cover,
            ),
          ), */
          ListTile(
            titleTextStyle: TextStyle(
                color: custom_color.headerTextBrown,
                fontFamily: 'Roboto',
                fontSize: 20),
            enableFeedback: true,
            title: Container(child: Text(postData.title)),
            subtitle: Text(
              postData.description,
            ),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute<Widget>(builder: (BuildContext context) {
                  return Scaffold(
                    appBar: AppBar(title: const Text('Go Back')),
                    body: Hero(
                      tag: postData.title,
                      child: Material(
                          child: ListView(
                        children: [
                          ListTile(
                              titleTextStyle: TextStyle(
                                  color: custom_color.headerTextBrown,
                                  fontFamily: 'Roboto',
                                  fontSize: 20),
                              enableFeedback: true,
                              title: Container(child: Text(postData.title)),
                              subtitle: Text(
                                postData.description,
                              )),
                          CommentForm(postData: postData)
                        ],
                      )),
                    ),
                  );
                }),
              );
            },
          )
        ]),
      ),
    );
  }
}
