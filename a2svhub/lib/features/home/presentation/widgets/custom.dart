// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';

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
      padding: EdgeInsets.all(20),
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
          Text(text1, style: TextStyle(fontWeight: FontWeight.bold),),
          Row(
            children: [
              ClipOval(child: Container(child: Icon(Icons.trending_down, color: Colors.green,), color: Color(0xFFC8FACD),)),
              SizedBox(width: 10,),
              Text("$num1%"),
              Container(
                width: 50,
                height: 50,
                // color: Colors.green.shade200,
              )
            ],
          ),
          Text(num2.toString(), style: TextStyle(fontWeight: FontWeight.bold, fontSize: 33),)

        ],
      ),
    );
  }
}
