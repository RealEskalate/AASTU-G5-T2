import 'package:a2svhub/core/widgets/navbar.dart';
import 'package:a2svhub/core/widgets/sidebar.dart';
import 'package:a2svhub/features/contests/domain/usecase/getcontestsusecase.dart';
import 'package:a2svhub/features/contests/presentation/bloc/contestpagebloc.dart';
import 'package:a2svhub/features/contests/presentation/bloc/contestpageevent.dart';
import 'package:a2svhub/features/contests/presentation/bloc/contestpagestate.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'package:a2svhub/features/contests/presentation/widget/contestcard.dart';
import 'package:a2svhub/servicelocator.dart'; // Assuming you registered GetContestsUseCase in your DI

class ContestScreen extends StatelessWidget {
  const ContestScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => ContestBloc(sl<GetContestsUseCase>())..add(LoadContestsEvent()),
      child: Scaffold(
        appBar: TopNavBar(),  // Top navbar added here
        drawer: Drawer(
          width: MediaQuery.of(context).size.width * 0.75,  // 75% width
          child: SidebarWidget(),
        ),
        body: Padding(
          padding: const EdgeInsets.all(16),
          child: BlocBuilder<ContestBloc, ContestState>(
            builder: (context, state) {
              if (state is ContestLoading) {
                return const Center(child: CircularProgressIndicator());
              } else if (state is ContestLoaded) {
                return ListView(
                  children: [
                    const Text(
                      "Contests",
                      style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 4),
                    const Text("Ratings & contests", style: TextStyle(color: Colors.grey)),
                    const SizedBox(height: 20),
                    Row(
                      children: [
                        Expanded(
                          child: DropdownButtonFormField<String>(
                            decoration: InputDecoration(
                              hintText: 'Groups',
                              border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                              contentPadding: const EdgeInsets.symmetric(horizontal: 12),
                            ),
                            items: const [
                              DropdownMenuItem(value: 'A2SV', child: Text('A2SV')),
                            ],
                            onChanged: (value) {},
                          ),
                        ),
                        const SizedBox(width: 10),
                        Expanded(
                          child: DropdownButtonFormField<String>(
                            decoration: InputDecoration(
                              hintText: 'Countries',
                              border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                              contentPadding: const EdgeInsets.symmetric(horizontal: 12),
                            ),
                            items: const [
                              DropdownMenuItem(value: 'Ethiopia', child: Text('Ethiopia')),
                            ],
                            onChanged: (value) {},
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 20),
                    ...state.contests.map((contest) => ContestCard(
                          title: contest.name,
                          problems: "${contest.problemCount} problems",
                          timeAgo: "Just now", // You can calculate real time ago if you want
                        )),
                  ],
                );
              } else if (state is ContestError) {
                return Center(child: Text(state.message));
              }
              return const SizedBox();
            },
          ),
        ),
      ),
    );
  }
}
