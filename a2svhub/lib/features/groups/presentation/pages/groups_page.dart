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
      appBar: AppBar(title: const Text('Groups & Users')),
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
              child: Column(
                children: state.groups.map((group) {
                  return GroupCard(
                    groupName: group.name,       // Assuming 'name' is a property of GroupEntity
                    groupCode: group.description,       // Assuming 'code' is a property of GroupEntity
                    members: group.country, 
                   
                  );
                }).toList(),
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
