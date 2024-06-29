import 'package:flutter/material.dart';
import 'package:ttp_app/widgets/profile/info.dart';

class Profile extends StatefulWidget {
  final String title;
  const Profile({super.key, required this.title});

  @override
  State<Profile> createState() => _Profile();
}

class _Profile extends State<Profile> {
  @override
  Widget build(BuildContext context) {
    final ThemeData theme = Theme.of(context);
    return Card(
      shadowColor: Colors.transparent,
      margin: const EdgeInsets.all(8.0),
      child: SizedBox.expand(
        child: Center(
          child: Text(
            'Profile',
            style: theme.textTheme.titleLarge,
          ),
        ),
      ),
    );
  }
}
