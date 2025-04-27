import 'package:flutter/material.dart';

class LatestProblemTile extends StatelessWidget {
  final String difficulty;
  final String name;
  final Color difficultyColor;
  final VoidCallback onTap;

  const LatestProblemTile({
    super.key,
    required this.difficulty,
    required this.name,
    required this.difficultyColor,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          Container(
            padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(
              color: difficultyColor,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              difficulty,
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          SizedBox(width: 12),
          Expanded(
            child: Text(
              name,
              style: TextStyle(
                fontWeight: FontWeight.w500,
                fontSize: 14,
              ),
              overflow: TextOverflow.ellipsis,
            ),
          ),
          IconButton(
            onPressed: onTap,
            icon: Icon(Icons.open_in_new, size: 18),
          ),
        ],
      ),
    );
  }
}
