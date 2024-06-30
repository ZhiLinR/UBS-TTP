import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:ttp_app/const/var.dart';

class Profile {
  final String gender;
  final String organisationType;
  final String title;

  const Profile({
    required this.gender,
    required this.organisationType,
    required this.title,
  });

  factory Profile.fromJson(Map<String, dynamic> json) {
    return switch (json) {
      {
        'gender': String gender,
        'organisation_type': String organisationType,
        'title': String title,
      } =>
        Profile(
          gender: gender,
          organisationType: organisationType,
          title: title,
        ),
      _ => throw const FormatException('Failed to load album.'),
    };
  }
}

Future<Profile> fetchProfile({required String uid}) async {
  final response = await http.get(Uri.parse("$userEndpoint/profile/$uid"));

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    var jsonResponse = json.decode(response.body);
    var data = jsonResponse['message'];
    return Profile.fromJson(data as Map<String, dynamic>);
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Failed to load album');
  }
}
