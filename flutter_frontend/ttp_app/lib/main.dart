import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'const/colors.dart' as custom_color;
import './pages/home_page.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

Future main() async {
  runApp(const MyApp());
  await dotenv.load(fileName: ".env");
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        fontFamily: 'Roboto',
        iconTheme: IconThemeData(color: custom_color.inactiveIcon),
        primaryIconTheme: IconThemeData(color: custom_color.inactiveIcon),
        colorScheme: ColorScheme.fromSeed(
            seedColor: custom_color.seedColor,
            surface: custom_color.background,
            primary: custom_color.seedColor),
        outlinedButtonTheme: const OutlinedButtonThemeData(
            style: ButtonStyle(
                backgroundColor: WidgetStatePropertyAll<Color>(Colors.white),
                elevation: WidgetStatePropertyAll(2.0),
                shape: WidgetStatePropertyAll(RoundedRectangleBorder(
                    borderRadius: BorderRadius.all(Radius.circular(25)),
                    side: BorderSide(
                        color: Color.fromARGB(0xFF, 0x59, 0x33, 0x1A)))))),
        useMaterial3: true,
        cardTheme: CardTheme(
            color: custom_color.primaryBGBrown,
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10.0),
                side:
                    BorderSide(color: custom_color.outlineBrown, width: 3.0))),
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
      debugShowCheckedModeBanner: false,
    );
  }
}
