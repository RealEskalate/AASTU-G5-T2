import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart'; // Added for responsiveness

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
      padding: EdgeInsets.symmetric(vertical: 8.h), // .h for responsiveness
      child: Row(
        children: [
          Container(
            padding: EdgeInsets.symmetric(horizontal: 8.w, vertical: 4.h), // .w and .h for responsiveness
            decoration: BoxDecoration(
              color: difficultyColor,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              difficulty,
              style: TextStyle(
                fontSize: 12.sp, // .sp for responsiveness
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          SizedBox(width: 12.w), // .w for responsiveness
          Expanded(
            child: Text(
              name,
              style: TextStyle(
                fontWeight: FontWeight.w500,
                fontSize: 14.sp, // .sp for responsiveness
              ),
              overflow: TextOverflow.ellipsis,
            ),
          ),
          IconButton(
            onPressed: onTap,
            icon: Icon(Icons.open_in_new, size: 18.sp), // .sp for responsiveness
          ),
        ],
      ),
    );
  }
}
