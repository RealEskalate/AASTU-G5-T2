// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart'; // Added for responsiveness

class Custom extends StatelessWidget {
  final String text1;
  final double num1;
  final int num2;

  const Custom({
    super.key,
    required this.text1,
    required this.num1,
    required this.num2,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(20.w), // .w for responsiveness
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1), // Shadow color
            spreadRadius: 1, // Spread radius
            blurRadius: 10, // Blur radius
            offset: Offset(0, 3), // Offset in x and y direction
          ),
        ],
      ),

      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(text1, style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16.sp),), // .sp for responsiveness
          Row(
            children: [
              ClipOval(child: Container(child: Icon(Icons.trending_down, color: Colors.green,), color: Color(0xFFC8FACD),)),
              SizedBox(width: 10.w,), // .w for responsiveness
              Text("$num1%", style: TextStyle(fontSize: 14.sp),), // .sp for responsiveness
              Container(
                width: 50.w, // .w for responsiveness
                height: 50.h, // .h for responsiveness
                // color: Colors.green.shade200,
              )
            ],
          ),
          Text(num2.toString(), style: TextStyle(fontWeight: FontWeight.bold, fontSize: 33.sp),) // .sp for responsiveness
        ],
      ),
    );
  }
}
