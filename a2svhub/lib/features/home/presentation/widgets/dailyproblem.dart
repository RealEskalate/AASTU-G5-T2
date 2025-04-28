// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart'; // Added for responsiveness

class DailyProblemCard extends StatelessWidget {
  final String title;
  final String subtitle;
  final String description;
  final String difficultyInfo;
  final int solvedCount;
  final VoidCallback onSolvePressed;
  final VoidCallback onNewSolutionPressed;

  const DailyProblemCard({
    Key? key,
    required this.title,
    required this.subtitle,
    required this.description,
    required this.difficultyInfo,
    required this.solvedCount,
    required this.onSolvePressed,
    required this.onNewSolutionPressed,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFFD8F3DC),
        borderRadius: BorderRadius.circular(15),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            spreadRadius: 1,
            blurRadius: 8,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      padding: EdgeInsets.all(30.w), // .w for responsiveness
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(
                title,
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 20.sp, // .sp for responsiveness
                ),
              ),
              const SizedBox(width: 5),
              const Icon(Icons.access_time, size: 16),
              const Spacer(),
              const Icon(Icons.arrow_upward, size: 16, color: Colors.grey),
              const SizedBox(width: 5),
              const Icon(Icons.arrow_downward, size: 16, color: Colors.grey),
            ],
          ),
          SizedBox(height: 6.h), // .h for responsiveness
          Text(
            subtitle,
            style: TextStyle(
              fontSize: 15.sp, // .sp for responsiveness
              color: Colors.grey[700],
            ),
          ),
          SizedBox(height: 12.h), // .h for responsiveness
          Text(
            description,
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 23.sp, // .sp for responsiveness
            ),
          ),
          SizedBox(height: 8.h), // .h for responsiveness
          Text(
            difficultyInfo,
            style: TextStyle(
              fontSize: 20.sp, // .sp for responsiveness
              fontWeight: FontWeight.bold,
            ),
          ),
          SizedBox(height: 16.h), // .h for responsiveness
          ElevatedButton.icon(
            onPressed: onSolvePressed,
            icon: const Icon(Icons.open_in_new, size: 27),
            label: Text("Solve It Now", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 17.sp)), // .sp for responsiveness
            style: ElevatedButton.styleFrom(
              minimumSize: Size(double.infinity, 40.h), // .h for responsiveness
              backgroundColor: Colors.transparent,
              foregroundColor: Colors.black,
              side: BorderSide(color: Colors.green.shade400),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
              ),
              elevation: 0,
            ),
          ),
          SizedBox(height: 8.h), // .h for responsiveness
          SizedBox(
            width: double.infinity,
            child: TextButton.icon(
              onPressed: onNewSolutionPressed,
              icon: const Icon(Icons.add, size: 30),
              label: Text("New Solution", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 17.sp)), // .sp for responsiveness
              style: TextButton.styleFrom(
                foregroundColor: Colors.black,
              ),
            ),
          ),
          SizedBox(height: 16.h), // .h for responsiveness
          Center(
            child: Column(
              children: [
                Text(
                  "$solvedCount",
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 40.sp, // .sp for responsiveness
                  ),
                ),
                Text(
                  "Solved it",
                  style: TextStyle(
                    fontSize: 18.sp, // .sp for responsiveness
                    color: Colors.grey[800],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
