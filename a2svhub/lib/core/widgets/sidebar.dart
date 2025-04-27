import 'package:flutter/material.dart';

class SidebarWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Column(
        children: <Widget>[
          UserAccountsDrawerHeader(
            accountName: Text("Sefina Kamile Abrar"),
            accountEmail: Text("Student"),
            currentAccountPicture: CircleAvatar(
              backgroundImage: AssetImage("assets/profile_picture.png"),
            ),
          ),
          Expanded(
            child: ListView(
              padding: EdgeInsets.zero,
              children: <Widget>[
                _buildListTile(context, Icons.home, 'Home', '/'),
                _buildListTile(context, Icons.track_changes, 'Tracks', '/tracks'),
                _buildListTile(context, Icons.show_chart, 'Progress', '/progress'),
                _buildListTile(context, Icons.assignment, 'Problems', '/problems'),
                _buildListTile(context, Icons.emoji_events, 'Contests', '/contest-page'),
                _buildListTile(context, Icons.assignment_turned_in, 'Roadmap', '/roadmap'),
                Divider(),
                _buildListTile(context, Icons.people, 'Users', '/users'),
                _buildListTile(context, Icons.group, 'Groups', '/group-page'),
                _buildListTile(context, Icons.forum, 'Forum', '/forum'),
                _buildListTile(context, Icons.event, 'Sessions', '/sessions'),
              ],
            ),
          ),
          Divider(),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              children: [
                Text(
                  "Hi, Sefina",
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
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
      ),
    );
  }

  Widget _buildListTile(BuildContext context, IconData icon, String title, String route) {
    return ListTile(
      leading: Icon(icon),
      title: Text(title),
      onTap: () {
        Navigator.pushNamed(context, route);
      },
    );
  }
}