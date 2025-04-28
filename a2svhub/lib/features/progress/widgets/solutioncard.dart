import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class SolutionCard extends StatelessWidget {
  final String title;
  final String subtitle;
  final String platform;
  final String difficulty;
  final List<String> tags;
  final bool isChecked;
  final VoidCallback? onCheckboxChanged;
  final ImageProvider? image;

  const SolutionCard({
    super.key,
    required this.title,
    required this.subtitle,
    required this.tags,
    required this.difficulty,
    required this.platform,
    this.isChecked = false,
    this.onCheckboxChanged,
    this.image,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      margin: EdgeInsets.all(8.w), // .w for responsive margin
      child: Padding(
        padding: EdgeInsets.all(16.h), // .h for responsive padding
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header row with title and checkbox
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Flexible(
                  child: Container(
                    padding: EdgeInsets.symmetric(
                        vertical: 4.h, horizontal: 8.w), // .h and .w for padding
                    decoration: BoxDecoration(
                      color: _getDifficultyColor(
                          difficulty), // Dynamic background color
                      borderRadius: BorderRadius.circular(8.w), // .w for radius
                    ),
                    child: Text(
                      difficulty,
                      style: TextStyle(
                        fontSize: 18.sp, // .sp for responsive font size
                        fontWeight: FontWeight.bold,
                        color: _getTextColor(difficulty), // Text color (white)
                      ),
                      overflow: TextOverflow.ellipsis, // Handles overflow
                    ),
                  ),
                ),
                Flexible(
                  child: Text(
                    title,
                    style: TextStyle(
                      fontSize: 18.sp, // .sp for responsive font size
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                TextButton(
                  onPressed: () {
                    // TODO: Add your onPressed logic here
                  },
                  child: Text(
                    "+ New Solution",
                    style: TextStyle(
                      fontSize: 16.sp, // .sp for responsive font size
                      fontWeight: FontWeight.w600,
                      color: Colors.black, // You can change this color as needed
                    ),
                  ),
                )
              ],
            ),

            SizedBox(height: 8.h), // .h for responsive height

            // Subtitle with "+ New Solution" indicator
            SizedBox(height: 12.h), // .h for responsive height

            // Tags row with Wrap to handle overflow
            SingleChildScrollView(
              scrollDirection: Axis.horizontal, // Makes the text scrollable horizontally
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: 8.w), // .w for padding
                decoration: BoxDecoration(
                  color: Colors.grey[200], // Background color
                  borderRadius: BorderRadius.circular(8.w), // .w for radius
                ),
                child: Text(
                  tags.join(', '), // Joins tags with commas
                  style: TextStyle(
                    fontSize: 12.sp, // .sp for responsive font size
                    fontWeight: FontWeight.normal, // Style of the text
                    color: Colors.black, // Text color
                  ),
                ),
              ),
            ),

            Padding(
              padding: EdgeInsets.only(top: 12.h), // .h for responsive height
              child: Row(
                children: [
                  Flexible(
                    child: Text(platform),
                  ),
                ],
              ),
            ),

            // Optional image (if needed)
            // if (image != null) ...[
            //   SizedBox(height: 12.h),
            //   Image(image: image!, height: 150.h, fit: BoxFit.cover), // .h for responsive height
            // ],
          ],
        ),
      ),
    );
  }

  Color _getDifficultyColor(String difficulty) {
    if (difficulty.toLowerCase() == 'hard') {
      return Colors.red.withOpacity(0.2); // Red with reduced opacity
    } else if (difficulty.toLowerCase() == 'medium') {
      return Colors.orange.withOpacity(0.2); // Orange with reduced opacity
    } else if (difficulty.toLowerCase() == 'easy') {
      return Colors.green.withOpacity(0.2); // Green with reduced opacity
    } else {
      return Colors.grey.withOpacity(0.2); // Grey with reduced opacity (for default)
    }
  }

  Color _getTextColor(String difficulty) {
    if (difficulty.toLowerCase() == 'hard') {
      return Colors.red; // White text for hard difficulty
    } else if (difficulty.toLowerCase() == 'medium') {
      return Colors.orange; // Black text for medium difficulty
    } else if (difficulty.toLowerCase() == 'easy') {
      return Colors.green; // White text for easy difficulty
    } else {
      return Colors.black; // Default to black text if no match
    }
  }
}
