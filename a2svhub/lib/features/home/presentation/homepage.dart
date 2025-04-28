// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:a2svhub/core/widgets/navbar.dart';
import 'package:a2svhub/core/widgets/sidebar.dart';
import 'package:a2svhub/features/home/presentation/widgets/custom.dart';
import 'package:a2svhub/features/home/presentation/widgets/dailyproblem.dart';
import 'package:a2svhub/features/home/presentation/widgets/latestproblem.dart';
import 'package:a2svhub/features/home/presentation/widgets/latestsubmission.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart'; // Added for responsiveness

class Homepage extends StatelessWidget {
  const Homepage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: TopNavBar(),
      drawer: Drawer(
        width: MediaQuery.of(context).size.width * 0.75.w, // 75% width with .w for responsiveness
        child: SidebarWidget(),
      ),
      body: Center(
        child: SizedBox(
          width: MediaQuery.of(context).size.width * 0.9.w, // 90% width with .w for responsiveness
          child: Stack(
            children: [
              SingleChildScrollView(
                child: Column(
                  children: [
                    Container(
                      //first container
                      decoration: BoxDecoration(
                        color: Color(0xFFD1E9FF),
                        borderRadius: BorderRadius.circular(10),
                        boxShadow: [
                          BoxShadow(
                            color:
                                Colors.black.withOpacity(0.1), // Shadow color
                            spreadRadius: 1, // Spread radius
                            blurRadius: 10, // Blur radius
                            offset: Offset(0, 3), // Offset in x and y direction
                          ),
                        ],
                      ),
                      padding: EdgeInsets.only(left: 10.w, right: 10.w, bottom: 10.h), // Added .w and .h for responsiveness
                      child: Column(
                        children: [
                          Row(
                            children: [
                              Row(
                                children: [
                                  Icon(Icons.campaign_outlined),
                                  SizedBox(
                                    width: 8.w, // .w for responsiveness
                                  ),
                                  Text(
                                    "Info",
                                    style:
                                        TextStyle(fontWeight: FontWeight.bold),
                                  )
                                ],
                              ),
                              Spacer(),
                              ElevatedButton(
                                onPressed: () {},
                                style: ElevatedButton.styleFrom(
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(10),
                                    ),
                                    backgroundColor: Color(0xFF00AB55),
                                    elevation: 10,
                                    shadowColor: Colors.black),
                                child: Text("Join",
                                    style: TextStyle(
                                        color: Colors.white,
                                        fontWeight: FontWeight.bold)),
                              ),
                            ],
                          ),
                          Text(
                              "Join our Telegram channel for updates on A2SV Hub improvements, outages, and announcements")
                        ],
                      ),
                    ),
                    SizedBox(
                      height: 20.h, // .h for responsiveness
                    ),
                    Container(
                      //second container
                      decoration: BoxDecoration(
                        color: Color(0xFFC8FACD),
                        borderRadius: BorderRadius.circular(10),
                        boxShadow: [
                          BoxShadow(
                            color:
                                Colors.black.withOpacity(0.1), // Shadow color
                            spreadRadius: 1, // Spread radius
                            blurRadius: 10, // Blur radius
                            offset: Offset(0, 3), // Offset in x and y direction
                          ),
                        ],
                      ),
                      padding: EdgeInsets.all(20.w), // .w for responsiveness
                      child: Column(
                        children: [
                          Text(
                            "Have a vision, trust yourself, break some rules, ignore the naysayers, don't be afraid to fail",
                            textAlign: TextAlign.center,
                            style: TextStyle(fontWeight: FontWeight.bold),
                          ),
                          SizedBox(
                            height: 8.h, // .h for responsiveness
                          ),
                          Text(
                            "- Arnold Schwarzenegger",
                            style: TextStyle(fontStyle: FontStyle.italic),
                          ),
                          SizedBox(
                            height: 5.h, // .h for responsiveness
                          ),
                          SizedBox(
                              width: MediaQuery.of(context).size.width * 0.3.w,
                              child: Text(
                                "Welcome Back, User!",
                                textAlign: TextAlign.center,
                              )),
                          SizedBox(
                            height: 10.h, // .h for responsiveness
                          ),
                          ElevatedButton(
                            onPressed: () {},
                            style: ElevatedButton.styleFrom(
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(10),
                                ),
                                backgroundColor: Color(0xFF00AB55),
                                elevation: 6,
                                shadowColor: Colors.black),
                            child: Text("Problems",
                                style: TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold)),
                          ),
                          SizedBox(
                            height: 20.h, // .h for responsiveness
                          ),
                          Container(
                            width: 300.w, // .w for responsiveness
                            height: 300.h, // .h for responsiveness
                            color: Colors.green.shade200,
                          ),
                          SizedBox(
                            height: 10.h, // .h for responsiveness
                          )
                        ],
                      ),
                    ),
                    SizedBox(
                      height: 20.h, // .h for responsiveness
                    ),
                    Custom(
                      text1: "Solutions",
                      num1: 0.0,
                      num2: 414,
                    ),
                    SizedBox(
                      height: 30.h, // .h for responsiveness
                    ),
                    Custom(
                      text1: "Time Spent",
                      num1: 0.0,
                      num2: 1000,
                    ),
                    SizedBox(
                      height: 30.h, // .h for responsiveness
                    ),
                    Custom(
                      text1: "Rating",
                      num1: 0.0,
                      num2: 1200,
                    ),
                    SizedBox(
                      height: 30.h, // .h for responsiveness
                    ),
                    DailyProblemCard(
                      title: "Daily problem",
                      subtitle:
                          "Refreshes every 24 hours and\nneeds to be solved today!",
                      description:
                          "Maximum Number Of\nAchievable Transfer Requests",
                      difficultyInfo: "LeetCode · Hard · Backtracking",
                      solvedCount: 63,
                      onSolvePressed: () {
                        // Navigate to problem page
                        print("Solve It Now clicked!");
                      },
                      onNewSolutionPressed: () {
                        // Open new solution page
                        print("New Solution clicked!");
                      },
                    ),
                    SizedBox(
                      height: 16.h, // .h for responsiveness
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text("Latest Problems",
                            style: TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 20.sp)), // .sp for responsiveness
                        LatestProblemTile(
                          difficulty: "Hard",
                          name: "F - Malak’s Stack",
                          difficultyColor: Colors.red.shade100,
                          onTap: () {},
                        ),
                        LatestProblemTile(
                          difficulty: "Medium",
                          name: "E - NATOLI's String Quest",
                          difficultyColor: Colors.yellow.shade100,
                          onTap: () {},
                        ),
                      ],
                    ),
                    SizedBox(height: 16.h), // .h for responsiveness
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Latest Submissions",
                          style: TextStyle(
                              fontWeight: FontWeight.bold, fontSize: 20.sp), // .sp for responsiveness
                        ),
                        SizedBox(height: 8.h), // .h for responsiveness
                        LatestSubmissionTile(
                          name: "Firaol",
                          problem: "B - The Ethiopian Lakes",
                          imageUrl: "https://your-image-link.com",
                          onTap: () {},
                        ),
                        LatestSubmissionTile(
                          name: "Abre",
                          problem: "Daily Temperatures",
                          imageUrl: "https://your-image-link.com",
                          onTap: () {},
                        ),
                      ],
                    )
                  ],
                ),
              ),
              Positioned(
                right: -20.w, // .w for responsiveness
                top: (MediaQuery.of(context).size.height - 300.h) / 2, // .h for responsiveness
                child: SizedBox(
                  width: 50.w, // .w for responsiveness
                  height: 50.h, // .h for responsiveness
                  child: FloatingActionButton(
                    onPressed: () {},
                    shape: CircleBorder(),
                    backgroundColor: Color(0xFFEBF8F2),
                    elevation: 10,
                    child: Icon(Icons.tune),
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
