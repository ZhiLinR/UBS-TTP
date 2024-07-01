import 'package:flutter/material.dart';
import 'package:ttp_app/http/profile.dart';
import 'package:ttp_app/widgets/alertdialog.dart';

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
                  var response = await saveProfileChanges(
                      uid: widget.uid,
                      profileData: Profile(
                          gender: genderController.text,
                          title: titleController.text,
                          organisationType: organisationController.text));
                  // ignore: avoid_print
                  print(response.toString());
                  setState(() {
                    FocusManager.instance.primaryFocus?.unfocus();
                    openDialog(context, "Successfully Changed!",
                        "Your Profile has been successfully updated!");
                    setProfile();
                  });
                },
              ),
            ],
          ));
    });
  }
}
