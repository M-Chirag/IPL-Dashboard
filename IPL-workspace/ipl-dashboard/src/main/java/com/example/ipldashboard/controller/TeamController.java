package com.example.ipldashboard.controller;

import java.time.LocalDate;
import java.util.Iterator;
import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.ipldashboard.model.Match;
import com.example.ipldashboard.model.Team;
import com.example.ipldashboard.repository.MatchRepository;
import com.example.ipldashboard.repository.TeamRepository;

@RestController
@CrossOrigin
public class TeamController {
	
	private TeamRepository teamRepository;
	private MatchRepository matchRepository;

	public TeamController(TeamRepository teamRepository, MatchRepository matchRepository) {
		super();
		this.teamRepository = teamRepository;
		this.matchRepository = matchRepository;
	}

	@GetMapping("/team")
	public Iterable<Team> getAllTeams(){
		return this.teamRepository.findAll();
	}

	@GetMapping("/team/{teamName}")
	public Team getTeam(@PathVariable String teamName) {
		Team team = this.teamRepository.findByTeamName(teamName);
		team.setMatches(this.matchRepository.findLatestMatchesByTeam(teamName, 4)); 
		
		return team;
	}

	@GetMapping("/team/{teamName}/matches")
	public List<Match> getMatchesForTeam(@PathVariable String teamName,
										 @RequestParam int year){
		LocalDate startDate = LocalDate.of(year,1,1);
		LocalDate endDate = LocalDate.of(year+1,1,1);
		return this.matchRepository.getMatchesByTeamBetweenDates(
				teamName,
				startDate,
				endDate
		);
	}
	
}
