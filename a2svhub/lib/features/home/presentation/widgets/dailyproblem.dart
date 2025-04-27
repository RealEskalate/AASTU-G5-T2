// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';

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
      padding: const EdgeInsets.all(30),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(
                title,
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 20,
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
          const SizedBox(height: 6),
          Text(
            subtitle,
            style: TextStyle(
              fontSize: 15,
              color: Colors.grey[700],
            ),
          ),
          const SizedBox(height: 12),
          Text(
            description,
            style: const TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 23,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            difficultyInfo,
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 16),
          ElevatedButton.icon(
            onPressed: onSolvePressed,
            icon: const Icon(Icons.open_in_new, size: 27),
            label: const Text("Solve It Now", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 17)),
            style: ElevatedButton.styleFrom(
              minimumSize: const Size(double.infinity, 40),
              backgroundColor: Colors.transparent,
              foregroundColor: Colors.black,
              side: BorderSide(color: Colors.green.shade400),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
              ),
              elevation: 0,
            ),
          ),
          const SizedBox(height: 8),
          SizedBox(
            width: double.infinity,
            child: TextButton.icon(
              onPressed: onNewSolutionPressed,
              icon: const Icon(Icons.add, size: 30),
              label: const Text("New Solution", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 17)),
              style: TextButton.styleFrom(
                foregroundColor: Colors.black,
              ),
            ),
          ),
          const SizedBox(height: 16),
          Center(
            child: Column(
              children: [
                Text(
                  "$solvedCount",
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 40,
                  ),
                ),
                Text(
                  "Solved it",
                  style: TextStyle(
                    fontSize: 18,
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
