import 'package:flutter/material.dart';
import '../widgets/navigation_bar.dart';
import '../fetch/posts.dart';
import '../widgets/list_item.dart';

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  late Future<List> futureAlbum;

  @override
  void initState() {
    super.initState();
    futureAlbum = fetchAlbum();
    // ignore: avoid_print
    print(futureAlbum);
  }

  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      // This call to setState tells the Flutter framework that something has
      // changed in this State, which causes it to rerun the build method below
      // so that the display can reflect the updated values. If we changed
      // _counter without calling setState(), then the build method would not be
      // called again, and so nothing would appear to happen.
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: LayoutBuilder(builder: (context, constraints) {
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
                    scrollDirection: Axis.horizontal,
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
      }),
      bottomNavigationBar:
          const CustomNavigationBar(), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
