import 'package:flutter/material.dart';

class ContestCard extends StatelessWidget {
  final String title;
  final String problems;
  final String timeAgo;

  const ContestCard({
    super.key,
    required this.title,
    required this.problems,
    required this.timeAgo,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(vertical: 8),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
      ),
      elevation: 1,
      child: ListTile(
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        title: Text(title,
            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        subtitle: Text('$problems • $timeAgo'),
        trailing: Row(
          mainAxisSize: MainAxisSize.min,
          children: const [
            Icon(Icons.group, color: Colors.green),
            SizedBox(width: 8),
            Icon(Icons.open_in_new, color: Colors.green),
          ],
        ),
      ),
    );
  }
}
