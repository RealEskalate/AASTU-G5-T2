import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';

class UserProgressCard extends StatelessWidget {
  final String userName;
  final ImageProvider userImage;
  final int totalExercises;
  final int solvedExercises;
  final int availableExercises;

  const UserProgressCard({
    super.key,
    required this.userName,
    required this.userImage,
    required this.totalExercises,
    required this.solvedExercises,
    required this.availableExercises,
  });

  @override
  Widget build(BuildContext context) {
    double progress = solvedExercises / totalExercises;
    int completionPercentage = (progress * 100).round();

    return Padding(
      padding: EdgeInsets.symmetric(vertical: 12.h, horizontal: 8.w), // .h and .w for padding
      child: Container(
        padding: EdgeInsets.all(12.h), // .h for padding
        decoration: BoxDecoration(
          color: Colors.grey[100],
          borderRadius: BorderRadius.circular(12.w), // .w for border radius
          boxShadow: [
            BoxShadow(
              color: Colors.black12,
              blurRadius: 4,
              offset: Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          children: [
            // First Row: Avatar, Name, and progress column
            Row(
              children: [
                // Column 1: Avatar
                CircleAvatar(
                  backgroundImage: userImage,
                  radius: 25.w, // .w for radius
                ),
                SizedBox(width: 12.w), // .w for width

                // Column 2: User Name
                Expanded(
                  flex: 2,
                  child: Text(
                    userName,
                    style: GoogleFonts.poppins(
                      fontSize: 11.sp, // .sp for font size
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                ),

                // Column 3: Progress bar and stats
                Expanded(
                  flex: 3,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      // Progress Bar
                      LayoutBuilder(
                        builder: (context, constraints) {
                          return Stack(
                            children: [
                              Container(
                                width: constraints.maxWidth,
                                height: 10.h, // .h for height
                                decoration: BoxDecoration(
                                  color: Colors.green[100],
                                  borderRadius: BorderRadius.circular(10.h), // .h for radius
                                ),
                              ),
                              Container(
                                width: constraints.maxWidth * progress,
                                height: 10.h, // .h for height
                                decoration: BoxDecoration(
                                  color: Colors.green[700],
                                  borderRadius: BorderRadius.circular(10.h), // .h for radius
                                ),
                              ),
                            ],
                          );
                        },
                      ),
                      SizedBox(height: 8.h), // .h for spacing

                      // Stats Row
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            "$solvedExercises Solved | $completionPercentage%",
                            style: GoogleFonts.poppins(
                              fontSize: 12.sp, // .sp for font size
                              color: Colors.grey[600],
                            ),
                          ),
                        ],
                      ),
                      Row(
                        children: [
                          Text(
                            "$availableExercises Available",
                            style: GoogleFonts.poppins(
                              fontSize: 12.sp, // .sp for font size
                              fontWeight: FontWeight.w600,
                              color: Colors.green[700],
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
