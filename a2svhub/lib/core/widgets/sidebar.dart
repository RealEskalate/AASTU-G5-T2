import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:a2svhub/features/auth/presentation/Bloc/auth_bloc.dart'; // import your bloc
import 'package:a2svhub/features/auth/presentation/Bloc/auth_state.dart';

class SidebarWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: BlocBuilder<AuthBloc, AuthState>(
        builder: (context, state) {
          String name = "Guest";
          String role = "Role";

          if (state is MyProfileLoaded) {
            name = state.user.name ?? "Guest"; // safely use null checks
            role = state.user.role ?? "Role";
          } else if (state is LoginSuccess) {
            name = state.data['user'] ?? "Guest"; // accessing from Map
            role = state.data['role'] ?? "Role";
          }

          return Column(
            children: <Widget>[
              UserAccountsDrawerHeader(
                accountName: Text(name),
                accountEmail: Text(role),
                currentAccountPicture: CircleAvatar(
                  backgroundImage: AssetImage("assets/profile_picture.png"),
                ),
              ),
              Expanded(
                child: ListView(
                  padding: EdgeInsets.zero,
                  children: <Widget>[
                    _buildListTile(context, Icons.home, 'Home', '/home'),
                    _buildListTile(
                        context, Icons.track_changes, 'Tracks', '/tracks'),
                    _buildListTile(
                        context, Icons.show_chart, 'Progress', '/progress'),
                    _buildListTile(
                        context, Icons.assignment, 'Problems', '/problems'),
                    _buildListTile(context, Icons.emoji_events, 'Contests',
                        '/contest-page'),
                    _buildListTile(context, Icons.assignment_turned_in,
                        'Roadmap', '/roadmap'),
                    Divider(),
                    _buildListTile(context, Icons.people, 'Users', '/users'),
                    _buildListTile(
                        context, Icons.group, 'Groups', '/group-page'),
                    _buildListTile(context, Icons.forum, 'Forum', '/forum'),
                    _buildListTile(
                        context, Icons.event, 'Sessions', '/sessions'),
                  ],
                ),
              ),
              Divider(),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  children: [
                    Text(
                      "Hi, $name",
                      style:
                          TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                    Text("Spot any bugs or have feedback?"),
                    SizedBox(height: 10),
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.green,
                        foregroundColor: Colors.white,
                      ),
                      onPressed: () {
                        // Navigate to a contact page or open a feedback form
                      },
                      child: Text("Contact Developer"),
                    ),
                  ],
                ),
              ),
              ListTile(
                leading: Icon(Icons.logout),
                title: Text('Logout'),
                onTap: () {
                  // Implement logout functionality
                },
              ),
            ],
          );
        },
      ),
    );
  }

  Widget _buildListTile(
      BuildContext context, IconData icon, String title, String route) {
    return ListTile(
      leading: Icon(icon),
      title: Text(title),
      onTap: () {
        Navigator.pushNamed(context, route);
      },
    );
  }
}
