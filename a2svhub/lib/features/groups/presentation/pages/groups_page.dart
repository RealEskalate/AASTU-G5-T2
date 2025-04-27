import 'package:a2svhub/core/widgets/navbar.dart';
import 'package:a2svhub/core/widgets/sidebar.dart';
import 'package:a2svhub/features/groups/presentation/widgets/group_card.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:a2svhub/features/groups/presentation/bloc/group_page_bloc.dart';
import 'package:a2svhub/features/groups/presentation/bloc/group_page_state.dart';
import 'package:a2svhub/features/groups/presentation/bloc/group_page_event.dart';

class GroupsPage extends StatelessWidget {
  const GroupsPage({super.key});

  @override
  Widget build(BuildContext context) {
    // Trigger loading event when page is loaded
    context.read<GroupPageBloc>().add(GroupPageLoadEvent());

    return Scaffold(
      appBar: TopNavBar(),
      drawer: Drawer(
        width: MediaQuery.of(context).size.width * 0.75, // 75% width
        child: SidebarWidget(),
      ),
      body: BlocBuilder<GroupPageBloc, GrouppageState>(
        builder: (context, state) {
          // Show loading indicator while data is loading
          if (state is GroupPageLoading) {
            return const Center(child: CircularProgressIndicator());
          }

          // Show error message if there's an error
          if (state is GroupPageError) {
            return Center(child: Text('Error: ${state.Message}'));
          }

          // Show loaded data
          if (state is GroupPageLoaded) {
            return SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.all(
                    5), // Optional: to give some spacing from the screen edges
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment
                      .start, // This makes children align to the left
                  children: [
                    // "Groups" and "All" texts
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text(
                          'Groups',
                          style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(
                            height:
                                4), // small spacing between "Groups" and "All"
                        Text(
                          'All',
                          style: TextStyle(
                            fontSize: 16,
                            color: Colors.grey,
                          ),
                        ),
                        SizedBox(
                            height: 16), // spacing before group cards start
                      ],
                    ),
                    // List of group cards
                    ...state.groups.map((group) {
                      return GroupCard(
                        groupName: group.name,
                        groupCode: group.description,
                        members: group.country,
                      );
                    }).toList(),
                  ],
                ),
              ),
            );
          }

          // Fallback: Show a message if no data is available
          return const Center(child: Text('No groups available.'));
        },
      ),
    );
  }
}
