import 'package:flutter/material.dart';
//import '../widgets/navigation_bar.dart';
import '../fetch/posts.dart';
import '../pages/forum.dart';
import '../pages/home.dart';
import '../pages/profile.dart';
import 'package:ttp_app/tiled/main_game_page.dart';

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int currentPageIndex = 2;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: Theme.of(context).colorScheme.inversePrimary,
          title: Text(widget.title),
        ),
        body: <Widget>[
          // Pages Here
          const ForumPage(title: "Forum"),
          const MainGamePage(),
          const Home(title: "Home"),
          const Home(title: "Messages"),
          const Profile(title: "Profile"),
        ][currentPageIndex],
        bottomNavigationBar: NavigationBar(
          onDestinationSelected: (int index) {
            setState(() {
              currentPageIndex = index;
            });
          },
          selectedIndex: currentPageIndex,
          destinations: const <Widget>[
            NavigationDestination(
              selectedIcon: Icon(Icons.forum),
              icon: Icon(Icons.forum_outlined),
              label: 'Forum',
            ),
            NavigationDestination(
              selectedIcon: Icon(Icons.gamepad),
              icon: Icon(Icons.gamepad_rounded),
              label: 'Builder',
            ),
            NavigationDestination(
              selectedIcon: Icon(Icons.home_filled),
              icon: Icon(Icons.home_rounded),
              label: 'Home',
            ),
            NavigationDestination(
              selectedIcon: Icon(Icons.sms),
              icon: Icon(Icons.sms_rounded),
              label: 'Chat',
            ),
            NavigationDestination(
              selectedIcon: Icon(Icons.settings),
              icon: Icon(Icons.settings_rounded),
              label: 'Profile',
            ),
          ],
        ));
  }
}
