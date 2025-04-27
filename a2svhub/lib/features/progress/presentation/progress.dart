import 'dart:ui';

import 'package:a2svhub/core/widgets/navbar.dart';
import 'package:a2svhub/core/widgets/sidebar.dart';
import 'package:a2svhub/features/progress/widgets/solutioncard.dart';
import 'package:a2svhub/features/progress/widgets/teaminfo.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';


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
        width: MediaQuery.of(context).size.width * 0.75, // 75% width
        child: SidebarWidget(),
      ),
      body: LayoutBuilder(
        builder: (context, constraints) {
          return SingleChildScrollView(
            padding: const EdgeInsets.all(16.0),
            child: ConstrainedBox(
              constraints: BoxConstraints(
                minHeight: constraints.maxHeight - 32,
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
                                fontSize: 20,
                                fontWeight: FontWeight.w600,
                                color: Colors.black,
                              ),
                            ),
                          ),
                          SizedBox(width: 16),
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
                      SizedBox(height: 20),
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
                                        fontSize: 12,
                                        fontWeight: FontWeight.w600,
                                        color: Colors.grey,
                                      ),
                                    ),
                                  ),
                                ),
                                Container(
                                  width: 8,
                                  height: 8,
                                  margin: EdgeInsets.symmetric(horizontal: 8),
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
                                          fontSize: 14,
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
                          SizedBox(width: 16),
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
                        padding: EdgeInsets.only(top: 40),
                        child: Center(
                            child: Text(
                          "Personal Completion",
                          style: GoogleFonts.poppins(
                            fontWeight: FontWeight.w500,
                            fontSize: 20,
                          ),
                        )),
                      ),
                      Padding(
                        padding: EdgeInsets.only(top: 20),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Container(
                              height: 29,
                              width: 400,
                              decoration: BoxDecoration(
                                color: Colors.green[120],
                                borderRadius: BorderRadius.circular(35),
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
                                              BorderRadius.circular(10),
                                        ),
                                      ),
                                    ],
                                  );
                                },
                              ),
                            ),
                            SizedBox(height: 8),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  "225 Exercises | 195 Solved | 87% Completion",
                                  style: GoogleFonts.poppins(
                                    fontSize: 12,
                                    color: Colors.grey[600],
                                  ),
                                ),
                              ],
                            ),
                            Padding(
                              padding: EdgeInsets.only(bottom: 20),
                              child: Text(
                                "30 Available",
                                style: GoogleFonts.poppins(
                                  fontSize: 12,
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
                                padding: EdgeInsets.only(right: 100),
                                child: Text(
                                  "Detail Team Completion",
                                  style: GoogleFonts.poppins(
                                    fontSize: 16,
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
                            const SizedBox(height: 12),
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
                        padding: EdgeInsets.only(top: 20),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              "WED Nov 06 2024",
                              style: GoogleFonts.poppins(
                                fontSize: 15,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            SizedBox(height: 8),
                            Wrap(spacing: 8, runSpacing: 8, children: [
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
                      top: 50,
                      right: 16,
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
                      top: 100,
                      right: 16,
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
      padding: EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: Colors.grey[200],
        borderRadius: BorderRadius.circular(16),
      ),
      child: Text(
        text,
        style: GoogleFonts.poppins(
          fontSize: 12,
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
        constraints: BoxConstraints(maxWidth: 150),
        decoration: BoxDecoration(
          border: Border.all(color: Colors.grey),
          borderRadius: BorderRadius.circular(5),
        ),
        child: Padding(
          padding: EdgeInsets.symmetric(vertical: 8, horizontal: 12),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Flexible(
                child: Text(
                  value,
                  overflow: TextOverflow.ellipsis,
                  style: GoogleFonts.poppins(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      color: Colors.black.withOpacity(0.5) // 50% opacity
                      ),
                ),
              ),
              Icon(
                isVisible ? Icons.arrow_drop_up : Icons.arrow_drop_down,
                color: Colors.black,
              ),
            ],
          ),
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
      elevation: 4,
      borderRadius: BorderRadius.circular(5),
      child: Container(
        width: 150,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(5),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: items.map((item) {
            return InkWell(
              onTap: () => onSelected(item),
              child: Container(
                width: double.infinity,
                padding: EdgeInsets.symmetric(vertical: 12, horizontal: 16),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(5),
                  color: item == selectedValue
                      ? Colors.grey[200]
                      : Colors.transparent,
                ),
                child: Text(
                  item,
                  style: GoogleFonts.poppins(
                    fontSize: 16,
                    fontWeight: item == selectedValue
                        ? FontWeight.w600
                        : FontWeight.w500,
                    color: Colors.black,
                  ),
                ),
              ),
            );
          }).toList(),
        ),
      ),
    );
  }
}
