import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:ttp_app/const/var.dart';
import 'package:ttp_app/settings/settings.dart';
import 'package:ttp_app/http/posts.dart';
import 'package:ttp_app/http/profile.dart';

// Define a custom Form widget.
class ProfileForm extends StatefulWidget {
  final String uid;
  const ProfileForm({required this.uid, super.key});

  @override
  State<ProfileForm> createState() {
    return _ProfileFormState();
  }
}

class _ProfileFormState extends State<ProfileForm> {
  final _formKey = GlobalKey<FormState>();
  final titleController = TextEditingController();
  final genderController = TextEditingController();
  final organisationController = TextEditingController();

  late Profile futureProfile;
  void setProfile() async {
    futureProfile = await fetchProfile(uid: widget.uid);
    titleController.text = futureProfile.title;
    genderController.text = futureProfile.gender;
    organisationController.text = futureProfile.organisationType;
  }

  @override
  void dispose() {
    // Clean up the controller when the widget is disposed.
    titleController.dispose();
    genderController.dispose();
    organisationController.dispose();
    super.dispose();
  }

  @override
  void initState() {
    setProfile();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(builder: (context, constraints) {
      return Container(
          margin: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  const Text(
                    "My Profile Information",
                    style: TextStyle(fontFamily: 'Roboto', fontSize: 20),
                  ),
                ],
              ),
              TextFormField(
                controller: genderController,
                key: const Key("gender"),
                decoration: const InputDecoration(
                  border: UnderlineInputBorder(),
                  labelText: 'Gender',
                ),
              ),
              TextFormField(
                controller: titleController,
                key: const Key("title"),
                decoration: const InputDecoration(
                  border: UnderlineInputBorder(),
                  labelText: 'Organisational Position',
                ),
              ),
              TextFormField(
                controller: organisationController,
                key: const Key("organisation"),
                decoration: const InputDecoration(
                  border: UnderlineInputBorder(),
                  labelText: 'Organisation Type',
                ),
              ),
              ElevatedButton(
                child: const Text('Save Changes'),
                onPressed: () async {
                  var response = await postComment(
                      widget.postData.postID, commentController.text);
                  // ignore: avoid_print
                  print(response);
                  setState(() {});
                },
              ),
            ],
          ));
    });
  }
}
