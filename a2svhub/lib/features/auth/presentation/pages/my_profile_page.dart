import 'package:a2svhub/core/widgets/navbar.dart';
import 'package:a2svhub/core/widgets/sidebar.dart';
import 'package:a2svhub/features/auth/presentation/Bloc/auth_bloc.dart';
import 'package:a2svhub/features/auth/presentation/Bloc/auth_event.dart';
import 'package:a2svhub/features/auth/presentation/Bloc/auth_state.dart';
import 'package:a2svhub/features/auth/presentation/pages/Link_Title.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class MyProfilePage extends StatelessWidget {
  const MyProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    // Trigger the GetMyProfileEvent when the page is loaded
    context.read<AuthBloc>().add(GetMyProfileEvent());

    return Scaffold(
      appBar: TopNavBar(),
      drawer: Drawer(
        width: MediaQuery.of(context).size.width * 0.75, // 75% width
        child: SidebarWidget(),
      ),
      backgroundColor: const Color(0xFFF8F8F8),

      body: BlocListener<AuthBloc, AuthState>(
        listener: (context, state) {
          if (state is AuthError) {
            if (state.message.contains('session has expired')) {
              Navigator.pushReplacementNamed(context, '/login');
            } else {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text(state.message)),
              );
            }
          }
        },
        child: BlocBuilder<AuthBloc, AuthState>(
          builder: (context, state) {
            if (state is AuthLoading) {
              return const Center(child: CircularProgressIndicator());
            } else if (state is MyProfileLoaded) {
              final profile = state.user;

              return SingleChildScrollView(
                padding: EdgeInsets.all(16.w), // .w for padding
                child: Column(
                  children: [
                    // Profile Card
                    Container(
                      decoration: BoxDecoration(
                        color: const Color(0xFF0D5B4C),
                        borderRadius: BorderRadius.circular(16.w), // .w for borderRadius
                      ),
                      padding: EdgeInsets.all(16.w), // .w for padding
                      child: Row(
                        children: [
                          CircleAvatar(
                            radius: 30.w, // .w for radius
                            backgroundImage: NetworkImage(
                              profile.photo ?? 'https://via.placeholder.com/150',
                            ),
                          ),
                          SizedBox(width: 16.w), // .w for spacing
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                profile.name ?? 'N/A',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 18.sp, // .sp for fontSize
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              Text(
                                profile.role ?? 'N/A',
                                style: const TextStyle(color: Colors.white70),
                              ),
                              Row(
                                children:  [
                                  Icon(Icons.circle, size: 10.sp, color: Colors.green), // .sp for icon size
                                  SizedBox(width: 4.w), // .w for spacing
                                  Text('online', style: TextStyle(color: Colors.greenAccent)),
                                ],
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),

                    SizedBox(height: 16.h), // .h for height spacing

                    // About Section
                    Container(
                      padding: EdgeInsets.all(16.w), // .w for padding
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(16.w), // .w for borderRadius
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'About',
                            style: TextStyle(fontSize: 18.sp, fontWeight: FontWeight.bold), // .sp for fontSize
                          ),
                          SizedBox(height: 12.h), // .h for spacing
                          if (profile.shortBio != null && profile.shortBio!.isNotEmpty)
                            Text(
                              profile.shortBio!,
                              style: const TextStyle(color: Colors.black87),
                            ),
                          SizedBox(height: 16.h), // .h for spacing
                          if (profile.country != null && profile.country!.isNotEmpty)
                            Row(
                              children: [
                                Icon(Icons.location_on, size: 20.sp), // .sp for icon size
                                SizedBox(width: 8.w), // .w for spacing
                                Text(profile.country!),
                              ],
                            ),
                          SizedBox(height: 8.h), // .h for spacing
                          if (profile.email != null && profile.email!.isNotEmpty)
                            Row(
                              children: [
                                Icon(Icons.email, size: 20.sp), // .sp for icon size
                                SizedBox(width: 8.w), // .w for spacing
                                Text(profile.email!),
                              ],
                            ),
                          SizedBox(height: 8.h), // .h for spacing
                          if (profile.university != null && profile.university!.isNotEmpty)
                            Row(
                              children: [
                                Icon(Icons.school, size: 20.sp), // .sp for icon size
                                SizedBox(width: 8.w), // .w for spacing
                                Text(profile.university!),
                              ],
                            ),
                        ],
                      ),
                    ),

                    SizedBox(height: 24.h), // .h for spacing

                    // Links Section
                    Container(
                      padding: EdgeInsets.all(16.w), // .w for padding
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(16.w), // .w for borderRadius
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Links',
                            style: TextStyle(fontSize: 18.sp, fontWeight: FontWeight.bold), // .sp for fontSize
                          ),
                          SizedBox(height: 12.h), // .h for spacing
                          if (profile.leetcode != null && profile.leetcode!.isNotEmpty)
                            LinkTile(
                              icon: Icons.code,
                              label: 'Leetcode',
                              url: profile.leetcode!,
                            ),
                          if (profile.codeforces != null && profile.codeforces!.isNotEmpty)
                            LinkTile(
                              icon: Icons.bar_chart,
                              label: 'Codeforces',
                              url: profile.codeforces!,
                            ),
                          if (profile.github != null && profile.github!.isNotEmpty)
                            LinkTile(
                              icon: Icons.book,
                              label: 'Github',
                              url: profile.github!,
                            ),
                          if (profile.instagram != null && profile.instagram!.isNotEmpty)
                            LinkTile(
                              icon: Icons.camera_alt,
                              label: 'Instagram',
                              url: profile.instagram!,
                            ),
                          if (profile.telegramUsername != null && profile.telegramUsername!.isNotEmpty)
                            LinkTile(
                              icon: Icons.send,
                              label: 'Telegram',
                              url: profile.telegramUsername!,
                            ),
                        ],
                      ),
                    ),
                  ],
                ),
              );
            } else if (state is AuthError) {
              return Center(child: Text(state.message));
            } else {
              return const Center(child: Text('No profile data available.'));
            }
          },
        ),
      ),
    );
  }
}
