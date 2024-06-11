import 'package:flutter/material.dart';
/* import 'package:winx_app/pages/home_page.dart';

import 'package:winx_app/components/localStorage.dart';
import 'package:winx_app/pages/profile_page.dart';
import 'package:winx_app/pages/shop_page.dart';
import 'package:winx_app/pages/tasklist.dart'; */
/* 
class NavigationBarApp extends StatelessWidget {
  const NavigationBarApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(home: NavigationExample());
  }
} */

class NavigationExample extends StatefulWidget {
  const NavigationExample({super.key});

  @override
  State<NavigationExample> createState() => _NavigationExampleState();
}

class _NavigationExampleState extends State<NavigationExample> {
  int currentPageIndex = 1;
  //String username = getStringFromLocalStorage('username').toString();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: <Widget>[
        Container(
            //color: Colors.red,
            alignment: Alignment.center,
            child: const Text("Hello") // replace with task list page
            ),
        Container(
          //color: Colors.green,
          alignment: Alignment.center,
          child: const Text("Hello"), // replace with home page
        ),
        Container(
            //color: Colors.blue,
            alignment: Alignment.center,
            child: const Text("Hello") // replace with profile page
            ),
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
            selectedIcon: Icon(Icons.assignment),
            icon: Icon(Icons.assignment_outlined),
            label: 'Daily Tasks',
          ),
          NavigationDestination(
            selectedIcon: Icon(Icons.home),
            icon: Icon(Icons.home_outlined),
            label: 'Home',
          ),
          NavigationDestination(
            selectedIcon: Icon(Icons.account_box),
            icon: Icon(Icons.account_box_outlined),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}
