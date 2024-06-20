import 'package:flutter/material.dart';
import '../fetch/posts.dart';
import '../widgets/list_item.dart';

class ForumPage extends StatefulWidget {
  const ForumPage({super.key, required this.title});
  final String title;

  @override
  State<ForumPage> createState() => _ForumPageState();
}

class _ForumPageState extends State<ForumPage> {
  int currentPageIndex = 0;
  late Future<List> futureAlbum;
  @override
  void initState() {
    super.initState();
    futureAlbum = fetchAlbum();
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(builder: (context, constraints) {
      return Column(
        children: [
          Expanded(
              child: FutureBuilder<List<dynamic>>(
            future: futureAlbum,
            builder: (context, snapshot) {
              // ignore: avoid_print
              print(snapshot);
              if (snapshot.hasData &&
                  snapshot.connectionState == ConnectionState.done) {
                return ListView.builder(
                  scrollDirection: Axis.vertical,
                  shrinkWrap: true,
                  itemCount: snapshot.data!.length,
                  itemBuilder: (context, index) {
                    Post temp = snapshot.data?[index];
                    return PostWidget(postData: temp);
                  },
                );
              }
              // By default, show a loading spinner.
              return const CircularProgressIndicator();
            },
          ))
        ],
      );
    });
  }
}
