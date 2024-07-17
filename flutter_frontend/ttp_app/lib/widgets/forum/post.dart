import 'package:flutter/material.dart';
import 'package:ttp_app/http/posts.dart';
import 'package:ttp_app/const/colors.dart' as custom_color;
import 'package:ttp_app/widgets/forum/comments.dart';

class PostWidget extends StatefulWidget {
  final Post postData;
  final String picture;
  const PostWidget(
      {super.key,
      this.picture =
          "https://www.meme-arsenal.com/memes/6555df5f021aaa0839af4f29f0a18ed1.jpg",
      required this.postData});

  @override
  _PostWidgetState createState() {
    return _PostWidgetState();
  }
}

class _PostWidgetState extends State<PostWidget> {
  @override
  Widget build(BuildContext context) {
    return Card(
      clipBehavior: Clip.hardEdge,
      child: Container(
        child: Column(children: [
          Container(
            margin: EdgeInsets.all(20.0),
            child: Image.network(
              widget.picture,
              fit: BoxFit.cover,
            ),
          ),
          ListTile(
            tileColor: custom_color.secondaryBGBrown,
            titleTextStyle: TextStyle(
                color: custom_color.headerTextBrown,
                fontFamily: 'Roboto',
                fontSize: 20),
            enableFeedback: true,
            title: Container(child: Text(widget.postData.title)),
            subtitle: Text(
              widget.postData.description,
            ),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute<Widget>(builder: (BuildContext context) {
                  return Scaffold(
                    appBar: AppBar(title: const Text('Go Back')),
                    body: Hero(
                      tag: widget.postData.title,
                      child: Material(
                          child: ListView(
                        children: [
                          ListTile(
                              titleTextStyle: TextStyle(
                                  color: custom_color.headerTextBrown,
                                  fontFamily: 'Roboto',
                                  fontSize: 20),
                              enableFeedback: true,
                              title:
                                  Container(child: Text(widget.postData.title)),
                              subtitle: Text(
                                widget.postData.description,
                              )),
                          Comments(postData: widget.postData),
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
