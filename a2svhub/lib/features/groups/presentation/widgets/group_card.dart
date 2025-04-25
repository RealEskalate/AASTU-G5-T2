import 'package:flutter/material.dart';

class GroupCard extends StatelessWidget {
  final String groupName;
  final String groupCode;
  final String members;
  // final int timeSpent;
  // final int avgRating;

  const GroupCard({
    super.key,
    required this.groupName,
    required this.groupCode,
    required this.members,
    // required this.timeSpent,
    // required this.avgRating,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(vertical: 10, horizontal: 15),
      elevation: 3,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              groupName,
              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 6),
            Text(
              '$groupCode • $members Members',
              style: TextStyle(color: Colors.grey[700]),
            ),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  children: [
                    const Text('Time Spent',
                        style: TextStyle(color: Colors.grey)),
                    const SizedBox(height: 4),
                    // Text('$timeSpent',
                    //     style: const TextStyle(
                    //         fontSize: 16, fontWeight: FontWeight.w500)),
                  ],
                ),
                Column(
                  children: [
                    const Text('Avg. Rating',
                        style: TextStyle(color: Colors.grey)),
                    const SizedBox(height: 4),
                    // Text('$avgRating',
                    //     style: const TextStyle(
                    //         fontSize: 16, fontWeight: FontWeight.w500)),
                  ],
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
