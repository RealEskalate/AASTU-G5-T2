import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';

class UserCard extends StatefulWidget {
  final String username;
  final String group;

  const UserCard({required this.username, required this.group, super.key});

  @override
  State<UserCard> createState() => _UsePageState();
}

class _UsePageState extends State<UserCard> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(left: 20.w, right: 20.w), // .w for padding
      child: Container(
        height: 500.h, // .h for height
        width: 370.w, // .w for width
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20.w), // .w for border radius
          border: Border.all(
            color: Colors.grey.withOpacity(0.5),
            width: 1.w, // .w for border width
          ),
        ),
        child: Stack(
          children: [
            ClipRRect(
              borderRadius: BorderRadius.vertical(top: Radius.circular(20.w)), // .w for radius
              child: SizedBox(
                height: 180.h, // .h for height
                width: double.infinity,
                child: Stack(
                  fit: StackFit.expand,
                  children: [
                    Image.asset(
                      'assets/images/userone.jpg',
                      fit: BoxFit.cover,
                    ),
                    BackdropFilter(
                      filter: ImageFilter.blur(sigmaX: 8, sigmaY: 8),
                      child: Container(
                        color: Colors.black.withOpacity(0.2),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Padding(
              padding: EdgeInsets.only(top: 120.h), // .h for padding
              child: Column(
                children: [
                  Container(
                    width: 100.w, // .w for width
                    height: 100.h, // .h for height
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(color: Colors.white, width: 3.w), // .w for border width
                      image: const DecorationImage(
                        image: AssetImage('assets/images/userone.jpg'),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.only(top: 16.h), // .h for padding
                    child: Text(
                      widget.username,
                      style: TextStyle(
                          fontSize: 20.sp, fontWeight: FontWeight.bold), // .sp for font size
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.only(bottom: 8.h), // .h for padding
                    child: Text(
                      widget.group,
                      style: TextStyle(fontSize: 16.sp, color: Colors.grey), // .sp for font size
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.only(top: 20.h), // .h for padding
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        _buildStatColumn("Problems Solved", "24"),
                        _buildStatColumn("Submissions", "58"),
                        _buildStatColumn("Time", "12h"),
                      ],
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.only(top: 20.h), // .h for padding
                    child: TextButton(
                      onPressed: () {},
                      child: Text(
                        "View Profile",
                        style: GoogleFonts.poppins(
                          fontSize: 16.sp, // .sp for font size
                          color: Colors.green,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatColumn(String label, String value) {
    return Column(
      children: [
        Padding(
          padding: EdgeInsets.only(bottom: 4.h), // .h for padding
          child: Text(
            label,
            style: TextStyle(fontSize: 14.sp, color: Colors.grey), // .sp for font size
          ),
        ),
        Text(
          value,
          style: TextStyle(fontSize: 18.sp, fontWeight: FontWeight.bold), // .sp for font size
        ),
      ],
    );
  }
}
