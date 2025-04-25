
import 'package:equatable/equatable.dart';

abstract class GroupPageEvent extends Equatable {
  const GroupPageEvent();

  @override
  List<Object> get props => [];
}

class GroupPageLoadEvent extends GroupPageEvent {
  GroupPageLoadEvent();
}

class RefreshPageLoadEvent extends GroupPageEvent {
  RefreshPageLoadEvent();
}
