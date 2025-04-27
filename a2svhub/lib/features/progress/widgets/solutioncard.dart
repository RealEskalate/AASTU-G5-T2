import 'package:flutter/material.dart';

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
      margin: const EdgeInsets.all(8),
      child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header row with title and checkbox
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Flexible(
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                          vertical: 4, horizontal: 8), // Padding for spacing
                      decoration: BoxDecoration(
                        color: _getDifficultyColor(
                            difficulty), // Dynamic background color
                        borderRadius: BorderRadius.circular(
                            8), // Optional: rounded corners
                      ),
                      child: Text(
                        difficulty,
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color:
                              _getTextColor(difficulty), // Text color (white)
                        ),
                        overflow: TextOverflow.ellipsis, // Handles overflow
                      ),
                    ),
                  ),
                  Flexible(
                    child: Text(
                      title,
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                      // overflow: TextOverflow.ellipsis, // Handles overflow
                    ),
                  ),
                  TextButton(
                    onPressed: () {
                      // TODO: Add your onPressed logic here
                    },
                    child: Text(
                      "+ New Solution",
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                        color:
                            Colors.black, // You can change this color as needed
                      ),
                    ),
                  )
                ],
              ),

              const SizedBox(height: 8),

              // Subtitle with "+ New Solution" indicator
              const SizedBox(height: 12),

              // Tags row with Wrap to handle overflow
              SingleChildScrollView(
                scrollDirection:
                    Axis.horizontal, // Makes the text scrollable horizontally
                child: Container(
                  padding: const EdgeInsets.symmetric(
                      horizontal:
                          8), // Optional: padding for better visual spacing
                  decoration: BoxDecoration(
                    color: Colors.grey[200], // Background color
                    borderRadius:
                        BorderRadius.circular(8), // Optional: rounded corners
                  ),
                  child: Text(
                    tags.join(', '), // Joins tags with commas
                    style: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.normal, // Style of the text
                      color: Colors.black, // Text color
                    ),
                  ),
                ),
              ),

              Padding(
                padding: const EdgeInsets.only(top: 12),
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
              //   const SizedBox(height: 12),
              //   Image(image: image!, height: 150, fit: BoxFit.cover),
              // ],
            ],
          )),
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
