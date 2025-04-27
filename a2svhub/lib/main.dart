import 'package:a2svhub/features/auth/presentation/Bloc/auth_bloc.dart';
import 'package:a2svhub/features/auth/presentation/pages/custom_page_route.dart';
import 'package:a2svhub/features/auth/presentation/pages/my_profile_page.dart';
import 'package:a2svhub/features/auth/presentation/pages/profile_page.dart';
import 'package:a2svhub/features/auth/presentation/pages/sign_in_page.dart';
import 'package:a2svhub/features/contests/presentation/bloc/contestpagebloc.dart';
import 'package:a2svhub/features/contests/presentation/page/contestpage.dart';
import 'package:a2svhub/features/groups/presentation/pages/groups_page.dart';
import 'package:a2svhub/features/home/presentation/homepage.dart';
import 'package:a2svhub/features/progress/presentation/progress.dart';
import 'package:a2svhub/features/users/presentation/pages/user.dart';
import 'package:a2svhub/servicelocator.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

// Import the locator setup
import 'package:a2svhub/features/groups/presentation/bloc/group_page_bloc.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await setupLocator(); // Register dependencies before running the app
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    debugshowbannercheckmodeBanner: false; // Disable the debug banner
    return MultiBlocProvider(
      providers: [
        // Add your Bloc providers here
        BlocProvider<GroupPageBloc>(
          create: (context) =>
              sl<GroupPageBloc>(), // Use GetIt to access GroupPageBloc
        ),
        BlocProvider<AuthBloc>(
          create: (context) => sl<AuthBloc>(), // now AuthBloc added
        ),
        // Add other blocs here if needed
        BlocProvider<ContestBloc>(
          create: (context) =>
              sl<ContestBloc>(), // Use GetIt to access ContestBloc
        ),
      ],
      child: MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
          useMaterial3: true,
        ),
        home: const SignInScreen(),
        onGenerateRoute: (settings) {
          switch (settings.name) {
            case '/':
              return CustomPageRoute(page:Homepage(), settings: settings);
            case '/contest-page':
              return CustomPageRoute(
                page: const ContestScreen(),
                settings: settings,
              );
            case '/users':
              return CustomPageRoute(
                page: const UsePage(),
                settings: settings,
              );

            case '/my-profile-page':
              return CustomPageRoute(
                page: const MyProfilePage(),
                settings: settings,
              );
            case '/group-page':
              return CustomPageRoute(
                page: const GroupsPage(),
                settings: settings,
              );
            case '/signin':
              return CustomPageRoute(
                page: const SignInScreen(),
                settings: settings,
              );
            case '/profile':
              return CustomPageRoute(
                page: const ProfilePage(),
                settings: settings,
              );
             case '/progress':
              return CustomPageRoute(
                page:  ProgressScreen(),
                settings: settings,
              );

            default:
              return null;
          }
        },
      ),
    );
  }
}
