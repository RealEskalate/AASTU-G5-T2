import 'dart:ui';

import 'package:a2svhub/core/widgets/navbar.dart';
import 'package:a2svhub/core/widgets/sidebar.dart';
import 'package:a2svhub/features/progress/widgets/solutioncard.dart';
import 'package:a2svhub/features/progress/widgets/teaminfo.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart'; // Added for responsiveness

class ProgressScreen extends StatefulWidget {
  @override
  _ProgressScreenState createState() => _ProgressScreenState();
}

class _ProgressScreenState extends State<ProgressScreen> {
  bool isExpandedDropdownVisible = false;
  bool isAllDropdownVisible = false;
  bool showTeamDetails = false;
  String selectedExpanded = "Expanded";
  String selectedAll = "All";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: TopNavBar(),
      drawer: Drawer(
        width: MediaQuery.of(context).size.width * 0.75.w, // 75% width
        child: SidebarWidget(),
      ),
      body: LayoutBuilder(
        builder: (context, constraints) {
          return SingleChildScrollView(
            padding: EdgeInsets.all(16.h),
            child: ConstrainedBox(
              constraints: BoxConstraints(
                minHeight: constraints.maxHeight - 32.h,
              ),
              child: Stack(
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // First row - Exercises and Expanded dropdown
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Flexible(
                            child: Text(
                              "Exercises",
                              style: GoogleFonts.poppins(
                                fontSize: 20.sp, // .sp for responsive font size
                                fontWeight: FontWeight.w600,
                                color: Colors.black,
                              ),
                            ),
                          ),
                          SizedBox(width: 16.w), // .w for responsive width
                          Flexible(
                            child: _buildDropdownButton(
                              value: selectedExpanded,
                              isVisible: isExpandedDropdownVisible,
                              onTap: () {
                                setState(() {
                                  isExpandedDropdownVisible =
                                      !isExpandedDropdownVisible;
                                  isAllDropdownVisible = false;
                                });
                              },
                              items: ["Expanded", "Compact"],
                              onItemSelected: (value) {
                                setState(() {
                                  selectedExpanded = value;
                                  isExpandedDropdownVisible = false;
                                });
                              },
                            ),
                          ),
                        ],
                      ),
                      SizedBox(height: 20.h), // .h for responsive height
                      // Second row - Tracks/Progress and All dropdown
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Flexible(
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Flexible(
                                  child: TextButton(
                                    onPressed: () {},
                                    child: Text(
                                      'Tracks',
                                      style: GoogleFonts.poppins(
                                        fontSize: 12.sp, // .sp for responsive font size
                                        fontWeight: FontWeight.w600,
                                        color: Colors.grey,
                                      ),
                                    ),
                                  ),
                                ),
                                Container(
                                  width: 8.w, // .w for responsive width
                                  height: 8.h, // .h for responsive height
                                  margin: EdgeInsets.symmetric(horizontal: 8.w),
                                  decoration: BoxDecoration(
                                    color: Colors.black,
                                    shape: BoxShape.circle,
                                  ),
                                ),
                                Flexible(
                                  child: TextButton(
                                    onPressed: () {},
                                    child: FittedBox(
                                      fit: BoxFit.scaleDown,
                                      child: Text(
                                        'Progress',
                                        style: GoogleFonts.poppins(
                                          fontSize: 14.sp, // .sp for responsive font size
                                          fontWeight: FontWeight.w600,
                                          color: Colors.grey[600],
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          SizedBox(width: 16.w), // .w for responsive width
                          Flexible(
                            child: _buildDropdownButton(
                              value: selectedAll,
                              isVisible: isAllDropdownVisible,
                              onTap: () {
                                setState(() {
                                  isAllDropdownVisible = !isAllDropdownVisible;
                                  isExpandedDropdownVisible = false;
                                });
                              },
                              items: ["All", "Solved", "Unsolved"],
                              onItemSelected: (value) {
                                setState(() {
                                  selectedAll = value;
                                  isAllDropdownVisible = false;
                                });
                              },
                            ),
                          ),
                        ],
                      ),
                      Padding(
                        padding: EdgeInsets.only(top: 40.h),
                        child: Center(
                            child: Text(
                          "Personal Completion",
                          style: GoogleFonts.poppins(
                            fontWeight: FontWeight.w500,
                            fontSize: 20.sp, // .sp for responsive font size
                          ),
                        )),
                      ),
                      Padding(
                        padding: EdgeInsets.only(top: 20.h),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Container(
                              height: 29.h, // .h for responsive height
                              width: 400.w, // .w for responsive width
                              decoration: BoxDecoration(
                                color: Colors.green[120],
                                borderRadius: BorderRadius.circular(35.w), // .w for responsive radius
                              ),
                              child: LayoutBuilder(
                                builder: (context, constraints) {
                                  double completedPercentage = 195 / 225;
                                  return Stack(
                                    children: [
                                      Container(
                                        width: constraints.maxWidth *
                                            completedPercentage,
                                        decoration: BoxDecoration(
                                          color: Colors.green[700],
                                          borderRadius:
                                              BorderRadius.circular(10.w), // .w for responsive radius
                                        ),
                                      ),
                                    ],
                                  );
                                },
                              ),
                            ),
                            SizedBox(height: 8.h), // .h for responsive height
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  "225 Exercises | 195 Solved | 87% Completion",
                                  style: GoogleFonts.poppins(
                                    fontSize: 12.sp, // .sp for responsive font size
                                    color: Colors.grey[600],
                                  ),
                                ),
                              ],
                            ),
                            Padding(
                              padding: EdgeInsets.only(bottom: 20.h),
                              child: Text(
                                "30 Available",
                                style: GoogleFonts.poppins(
                                  fontSize: 12.sp, // .sp for responsive font size
                                  color: Colors.grey[600],
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      // Team details section
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Padding(
                                padding: EdgeInsets.only(right: 98.w), // .w for responsive padding
                                child: Text(
                                  "Detail Team Completion",
                                  style: GoogleFonts.poppins(
                                    fontSize: 16.sp, // .sp for responsive font size
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                              ),
                              GestureDetector(
                                onTap: () {
                                  setState(() {
                                    showTeamDetails = !showTeamDetails;
                                  });
                                },
                                child: AnimatedRotation(
                                  turns: showTeamDetails ? 0.75 : 0.25,
                                  duration: const Duration(milliseconds: 200),
                                  child: const Icon(Icons.arrow_forward_ios),
                                ),
                              ),
                            ],
                          ),
                          if (showTeamDetails) ...[
                             SizedBox(height: 12.h), // .h for responsive height
                            UserProgressCard(
                              userName: "Alice Brown",
                              userImage:
                                  AssetImage("assets/images/profile.jpg"),
                              totalExercises: 200,
                              solvedExercises: 140,
                              availableExercises: 60,
                            ),
                            UserProgressCard(
                              userName: "John Doe",
                              userImage:
                                  AssetImage("assets/images/profile.jpg"),
                              totalExercises: 150,
                              solvedExercises: 100,
                              availableExercises: 50,
                            ),
                            UserProgressCard(
                              userName: "Sophie Lee",
                              userImage:
                                  AssetImage("assets/images/profile.jpg"),
                              totalExercises: 175,
                              solvedExercises: 160,
                              availableExercises: 15,
                            ),
                          ]
                        ],
                      ),
                      // Date and Question Tags section
                      Padding(
                        padding: EdgeInsets.only(top: 20.h), // .h for responsive height
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              "WED Nov 06 2024",
                              style: GoogleFonts.poppins(
                                fontSize: 15.sp, // .sp for responsive font size
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            SizedBox(height: 8.h), // .h for responsive height
                            Wrap(spacing: 8.w, runSpacing: 8.h, children: [
                              _buildQuestionTag("geometry"),
                              _buildQuestionTag("constructive algorithm"),
                              _buildQuestionTag("greedy"),
                              _buildQuestionTag("number theory"),
                              _buildQuestionTag("Array"),
                              _buildQuestionTag("Bit manipulation"),
                              _buildQuestionTag("Binary Search"),
                            ]),
                          ],
                        ),
                      ),
                      SolutionCard(
                        platform: "Leetcode",
                        title: "Longest increasing Subsequence II",
                        subtitle: "Increasing Subsequence II",
                        difficulty: 'hard',
                        tags: [
                          "Array",
                          "Divide and Conquer",
                          "Dynamic Programming",
                          "Binary Indexed T"
                        ],
                        isChecked: false,
                        image: AssetImage(
                            'assets/leetcode_image.png'), // Optional image
                        onCheckboxChanged: () {
                          // Handle checkbox state change
                        },
                      ),
                      SolutionCard(
                        platform: "Leetcode",
                        title: "Longest increasing Subsequence II",
                        subtitle: "Increasing Subsequence II",
                        difficulty: 'hard',
                        tags: [
                          "Array",
                          "Divide and Conquer",
                          "Dynamic Programming",
                          "Binary Indexed T"
                        ],
                        isChecked: false,
                        image: AssetImage(
                            'assets/leetcode_image.png'), // Optional image
                        onCheckboxChanged: () {
                          // Handle checkbox state change
                        },
                      ),
                      SolutionCard(
                        platform: "Leetcode",
                        title: "Longest increasing Subsequence II",
                        subtitle: "Increasing Subsequence II",
                        difficulty: 'hard',
                        tags: [
                          "Array",
                          "Divide and Conquer",
                          "Dynamic Programming",
                          "Binary Indexed T"
                        ],
                        isChecked: false,
                        image: AssetImage(
                            'assets/leetcode_image.png'), // Optional image
                        onCheckboxChanged: () {
                          // Handle checkbox state change
                        },
                      ),
                      SolutionCard(
                        platform: "Leetcode",
                        title: "Longest increasing Subsequence II",
                        subtitle: "Increasing Subsequence II",
                        difficulty: 'hard',
                        tags: [
                          "Array",
                          "Divide and Conquer",
                          "Dynamic Programming",
                          "Binary Indexed T"
                        ],
                        isChecked: false,
                        image: AssetImage(
                            'assets/leetcode_image.png'), // Optional image
                        onCheckboxChanged: () {
                          // Handle checkbox state change
                        },
                      )
                    ],
                  ),
                  // Positioned dropdown menus
                  if (isExpandedDropdownVisible)
                    Positioned(
                      top: 50.h, // .h for responsive height
                      right: 16.w, // .w for responsive width
                      child: _buildDropdownMenu(
                        items: ["Expanded", "Compact"],
                        selectedValue: selectedExpanded,
                        onSelected: (value) {
                          setState(() {
                            selectedExpanded = value;
                            isExpandedDropdownVisible = false;
                          });
                        },
                      ),
                    ),
                  if (isAllDropdownVisible)
                    Positioned(
                      top: 100.h, // .h for responsive height
                      right: 16.w, // .w for responsive width
                      child: _buildDropdownMenu(
                        items: ["All", "Solved", "Unsolved"],
                        selectedValue: selectedAll,
                        onSelected: (value) {
                          setState(() {
                            selectedAll = value;
                            isAllDropdownVisible = false;
                          });
                        },
                      ),
                    ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildQuestionTag(String text) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 12.w, vertical: 6.h), // .w and .h for responsiveness
      decoration: BoxDecoration(
        color: Colors.grey[200],
        borderRadius: BorderRadius.circular(16.w), // .w for responsive radius
      ),
      child: Text(
        text,
        style: GoogleFonts.poppins(
          fontSize: 12.sp, // .sp for responsive font size
          color: Colors.grey[800],
        ),
      ),
    );
  }

  Widget _buildDropdownButton({
    required String value,
    required bool isVisible,
    required VoidCallback onTap,
    required List<String> items,
    required Function(String) onItemSelected,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        constraints: BoxConstraints(maxWidth: 150.w), // .w for responsive width
        padding: EdgeInsets.symmetric(horizontal: 10.w), // .w for responsive padding
        decoration: BoxDecoration(
          border: Border.all(color: Colors.grey[400]!, width: 1),
          borderRadius: BorderRadius.circular(8.w), // .w for responsive radius
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              value,
              style: GoogleFonts.poppins(
                fontSize: 12.sp, // .sp for responsive font size
                color: Colors.grey[600],
              ),
            ),
            Icon(
              isVisible
                  ? Icons.arrow_drop_up
                  : Icons.arrow_drop_down,
              size: 24.w, // .w for responsive size
              color: Colors.grey[600],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDropdownMenu({
    required List<String> items,
    required String selectedValue,
    required Function(String) onSelected,
  }) {
    return Material(
      color: Colors.transparent,
      child: Container(
        padding: EdgeInsets.all(8.w), // .w for responsive padding
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(10.w), // .w for responsive radius
          boxShadow: [
            BoxShadow(
              color: Colors.grey[300]!,
              blurRadius: 10,
              offset: Offset(0, 4.h), // .h for responsive height offset
            ),
          ],
        ),
        child: Column(
          children: items
              .map((item) => GestureDetector(
                    onTap: () => onSelected(item),
                    child: Padding(
                      padding: EdgeInsets.symmetric(vertical: 8.h), // .h for responsive height
                      child: Text(
                        item,
                        style: GoogleFonts.poppins(
                          fontSize: 14.sp, // .sp for responsive font size
                          color: Colors.black,
                        ),
                      ),
                    ),
                  ))
              .toList(),
        ),
      ),
    );
  }
}
