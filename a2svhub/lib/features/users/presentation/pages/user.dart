import 'package:a2svhub/core/widgets/navbar.dart';
import 'package:a2svhub/core/widgets/sidebar.dart';
import 'package:a2svhub/features/users/presentation/widgets/usercard.dart';
import 'package:flutter/material.dart';

class UsePage extends StatefulWidget {
  const UsePage({Key? key}) : super(key: key);

  @override
  _UsePageState createState() => _UsePageState();
}

class _UsePageState extends State<UsePage> {
  String _currentView = 'users'; // 'users' or 'stats'
  bool _showExtraText = false;

  final List<String> _filters = [
    "AAstuG55",
    "AAstuG56",
    "AAstuG57",
    "ASTUG58",
    "ASTUG59"
  ];
  String? _selectedFilter;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: TopNavBar(),
      drawer: Drawer(
        width: MediaQuery.of(context).size.width * 0.75, // 75% width
        child: SidebarWidget(),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            const SizedBox(height: 50),

            // 🔘 Icon Toggles
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Expanded(
                  child: IconButton(
                    icon: Icon(
                      Icons.window,
                      size: 20,
                      color:
                          _currentView == 'users' ? Colors.blue : Colors.grey,
                    ),
                    onPressed: () {
                      setState(() {
                        _currentView = 'users';
                      });
                    },
                  ),
                ),
                Expanded(
                  child: IconButton(
                    icon: Icon(
                      Icons.menu,
                      size: 20,
                      color:
                          _currentView == 'stats' ? Colors.blue : Colors.grey,
                    ),
                    onPressed: () {
                      setState(() {
                        _currentView = 'stats';
                      });
                    },
                  ),
                ),
                const SizedBox(width: 20),
              ],
            ),

            if (_currentView == 'users') _buildUserView(),
            if (_currentView == 'stats') _buildStatsView(),
          ],
        ),
      ),
    );
  }

  Widget _buildUserView() {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: TextField(
            decoration: InputDecoration(
              prefixIcon: const Icon(Icons.search),
              labelText: "Search User",
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
                borderSide: BorderSide(
                  color: Colors.grey.withOpacity(0.3), // 30% visible grey
                  width: 0.2,
                ),
              ),
            ),
          ),
        ),
        const SizedBox(height: 20),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: TextField(
            readOnly: true,
            onTap: () {
              setState(() => _showExtraText = !_showExtraText);
            },
            decoration: InputDecoration(
              hintText: _selectedFilter ?? "More Options",
              suffixIcon: Icon(
                _showExtraText
                    ? Icons.keyboard_arrow_up
                    : Icons.keyboard_arrow_down,
              ),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
                borderSide: BorderSide(
                  color: Colors.grey.withOpacity(0.2), // 30% visible grey
                  width: 1,
                ),
              ),
            ),
          ),
        ),
        if (_showExtraText)
          Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              children: _filters.map((filter) {
                final isSelected = _selectedFilter == filter;
                return FilterChip(
                  label: Text(filter),
                  selected: isSelected,
                  side: BorderSide.none,
                  onSelected: (_) {
                    setState(() {
                      _selectedFilter = filter;
                      _showExtraText = false;
                    });
                  },
                );
              }).toList(),
            ),
          ),
        const SizedBox(height: 30),
        const UserCard(
            username: 'bruno fernandes', group: 'Competitive Programmers'),
        const SizedBox(height: 30),
        const UserCard(username: 'Amina Yusuf', group: 'Dev Team'),
        const SizedBox(height: 30),
      ],
    );
  }

  Widget _buildStatsView() {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: TextField(
            decoration: InputDecoration(
              prefixIcon: const Icon(Icons.search),
              labelText: "Search User",
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
                borderSide: BorderSide(
                  color: Colors.grey.withOpacity(0.3), // 30% visible grey
                  width: 0.2,
                ),
              ),
            ),
          ),
        ),
        const SizedBox(height: 20),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: TextField(
            readOnly: true,
            onTap: () {
              setState(() => _showExtraText = !_showExtraText);
            },
            decoration: InputDecoration(
              hintText: _selectedFilter ?? "More Options",
              suffixIcon: Icon(
                _showExtraText
                    ? Icons.keyboard_arrow_up
                    : Icons.keyboard_arrow_down,
              ),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
                borderSide: BorderSide(
                  color: Colors.grey.withOpacity(0.2), // 30% visible grey
                  width: 1,
                ),
              ),
            ),
          ),
        ),
        if (_showExtraText)
          Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              children: _filters.map((filter) {
                final isSelected = _selectedFilter == filter;
                return FilterChip(
                  label: Text(filter),
                  selected: isSelected,
                  side: BorderSide.none,
                  onSelected: (_) {
                    setState(() {
                      _selectedFilter = filter;
                      _showExtraText = false;
                    });
                  },
                );
              }).toList(),
            ),
          ),
        const SizedBox(height: 30),
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          padding: const EdgeInsets.all(20),
          child: DataTable(
            columns: const [
              DataColumn(label: Text('Person')),
              DataColumn(label: Text('Solved')),
              DataColumn(label: Text('Time Spent')),
              DataColumn(label: Text('Rating')),
            ],
            rows: [
              _buildUserRow(
                  'assets/profile.jpg', 'Eyob Tesfaye', '45', '12h', '4.5'),
              _buildUserRow(
                  'assets/profile.jpg', 'Amina Yusuf', '38', '9h', '4.2'),
            ],
          ),
        ),
      ],
    );
  }

  DataRow _buildUserRow(
    String imagePath,
    String name,
    String solved,
    String timeSpent,
    String rating,
  ) {
    return DataRow(
      cells: [
        DataCell(Row(
          children: [
            CircleAvatar(backgroundImage: AssetImage(imagePath), radius: 16),
            const SizedBox(width: 8),
            Text(name),
          ],
        )),
        DataCell(Text(solved)),
        DataCell(Text(timeSpent)),
        DataCell(Text(rating)),
      ],
    );
  }
}
