import 'package:flutter_dotenv/flutter_dotenv.dart';

final forumEndpoint = dotenv.env["FORUM_URL"];
final gptEndpoint = dotenv.env["GPT_URL"];
final userEndpoint = dotenv.env["USER_URL"];

final devUID = dotenv.env["DEV_UID"];
