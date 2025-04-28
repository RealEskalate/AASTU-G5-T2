import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

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
    return SizedBox(
      height: 370.h, // Responsive height using .h
      child: Card(
        margin: EdgeInsets.symmetric(vertical: 10.h, horizontal: 15.w), // Responsive margin using .w and .h
        elevation: 3,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12.r), // Responsive border radius using .r
        ),
        child: Padding(
          padding: EdgeInsets.all(16.w), // Responsive padding using .w
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                groupName,
                style: TextStyle(
                  fontSize: 18.sp, // Responsive font size using .sp
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 6.h), // Responsive height using .h
              Text(
                '$groupCode • $members Members',
                style: TextStyle(color: Colors.grey[700]),
              ),
              SizedBox(height: 150.h), // Responsive height using .h
              Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Container(
                    width: 3.w, // Responsive width using .w
                    height: 40.h, // Responsive height using .h
                    color: Colors.grey[300],
                    margin: EdgeInsets.only(right: 10.w), // Responsive margin using .w
                  ),
                  Padding(
                    padding: EdgeInsets.only(right: 20.w), // Responsive padding using .w
                    child: Column(
                      children: [
                        Text('Time Spent',
                            style: TextStyle(color: Colors.grey)),
                        SizedBox(height: 4.h), // Responsive height using .h
                        // Text('$timeSpent',
                        //     style: const TextStyle(
                        //         fontSize: 16, fontWeight: FontWeight.w500)),
                      ],
                    ),
                  ),
                  Container(
                    width: 3.w, // Responsive width using .w
                    height: 40.h, // Responsive height using .h
                    color: Colors.grey[300],
                    margin: EdgeInsets.only(right: 10.w), // Responsive margin using .w
                  ),
                  Column(
                    children: [
                      Text('Avg. Rating',
                          style: TextStyle(color: Colors.grey)),
                      SizedBox(height: 4.h), // Responsive height using .h
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
      ),
    );
  }
}
