import 'package:flutter/material.dart';
import 'package:ttp_app/widgets/profile/profile_info.dart';
import 'package:ttp_app/settings/settings.dart';

import 'package:ttp_app/http/summary.dart';

class Profile extends StatefulWidget {
  final String title;
  const Profile({super.key, required this.title});

  @override
  State<Profile> createState() => _Profile();
}

class _Profile extends State<Profile> {
  late final Future<Summary> futureSummary;
  @override
  void initState() {
    futureSummary = fetchProfileSummary(uid: "666350518e5c4522aed85892");
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final ThemeData theme = Theme.of(context);
    return Column(
      children: [
        ProfileForm(uid: uid),
        Container(
          alignment: Alignment.centerLeft,
          padding: EdgeInsets.all(20.0),
          child: Text(
            "How we feel about you:",
            style: TextStyle(fontSize: 20.0),
          ),
        ),
        Container(
          padding: EdgeInsets.all(20.0),
          child: FutureBuilder<Summary>(
            future: futureSummary,
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                return Text(snapshot.data!.summary);
              } else if (snapshot.hasError) {
                return Text('${snapshot.error}');
              }
              // By default, show a loading spinner.
              return const CircularProgressIndicator();
            },
          ),
        ),
      ],
    );
    /*  return Card(
      shadowColor: Colors.transparent,
      margin: const EdgeInsets.all(8.0),
      child: SizedBox.expand(
        child: Center(
          child: ProfileForm(uid: uid),
        ),
      ),
    ); */
  }
}
