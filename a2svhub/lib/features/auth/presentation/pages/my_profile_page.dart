import 'package:a2svhub/features/auth/presentation/Bloc/auth_bloc.dart';
import 'package:a2svhub/features/auth/presentation/Bloc/auth_event.dart';
import 'package:a2svhub/features/auth/presentation/Bloc/auth_state.dart';
import 'package:a2svhub/features/auth/presentation/pages/Link_Title.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';



class MyProfilePage extends StatelessWidget {
  const MyProfilePage ({super.key});

  @override
  Widget build(BuildContext context) {
    // Trigger the GetMyProfileEvent when the page is loaded
    context.read<AuthBloc>().add(GetMyProfileEvent());

    return Scaffold(
      backgroundColor: const Color(0xFFF8F8F8),
      appBar: AppBar(
        backgroundColor: Colors.white,
        title: const Text('Profile', style: TextStyle(color: Colors.black)),
        elevation: 0,
        iconTheme: const IconThemeData(color: Colors.black),
      ),
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
                padding: const EdgeInsets.all(16),
                child: Column(
                  children: [
                    // Profile Card
                    Container(
                      decoration: BoxDecoration(
                        color: const Color(0xFF0D5B4C),
                        borderRadius: BorderRadius.circular(16),
                      ),
                      padding: const EdgeInsets.all(16),
                      child: Row(
                        children: [
                          CircleAvatar(
                            radius: 30,
                            backgroundImage: NetworkImage(
                              profile.photo ?? 'https://via.placeholder.com/150',
                            ),
                          ),
                          const SizedBox(width: 16),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                profile.name ?? 'N/A',
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              Text(
                                profile.role ?? 'N/A',
                                style: const TextStyle(color: Colors.white70),
                              ),
                              Row(
                                children: const [
                                  Icon(Icons.circle, size: 10, color: Colors.green),
                                  SizedBox(width: 4),
                                  Text('online', style: TextStyle(color: Colors.greenAccent)),
                                ],
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),

                    const SizedBox(height: 16),

                    // About Section
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'About',
                            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                          ),
                          const SizedBox(height: 12),
                          if (profile.shortBio != null && profile.shortBio!.isNotEmpty)
                            Text(
                              profile.shortBio!,
                              style: const TextStyle(color: Colors.black87),
                            ),
                          const SizedBox(height: 16),
                          if (profile.country != null && profile.country!.isNotEmpty)
                            Row(
                              children: [
                                const Icon(Icons.location_on, size: 20),
                                const SizedBox(width: 8),
                                Text(profile.country!),
                              ],
                            ),
                          const SizedBox(height: 8),
                          if (profile.email != null && profile.email!.isNotEmpty)
                            Row(
                              children: [
                                const Icon(Icons.email, size: 20),
                                const SizedBox(width: 8),
                                Text(profile.email!),
                              ],
                            ),
                          const SizedBox(height: 8),
                          if (profile.university != null && profile.university!.isNotEmpty)
                            Row(
                              children: [
                                const Icon(Icons.school, size: 20),
                                const SizedBox(width: 8),
                                Text(profile.university!),
                              ],
                            ),
                        ],
                      ),
                    ),

                    const SizedBox(height: 24),

                    // Links Section
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Links',
                            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                          ),
                          const SizedBox(height: 12),
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